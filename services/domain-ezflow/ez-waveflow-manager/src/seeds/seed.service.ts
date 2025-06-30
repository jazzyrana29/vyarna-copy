import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { WaveTypeGenre } from '../entities/wave-type-genre.entity';
import { WaveType } from '../entities/wave-type.entity';
import { NodeType } from '../entities/node-type.entity';
import { NodeExitType } from '../entities/node-exit-type.entity';
import { TaskStatus } from '../entities/task-status.entity';
import { EvaluationVariableDataType } from '../entities/evaluation-variable-data-type.entity';
import { EvaluationOperator } from '../entities/evaluation-operator.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    // Only auto-seed if SYNCHRONIZE=true or a specific env flag is set
    if (process.env.AUTO_SEED === 'true') {
      await this.seedFromJson(process.env.SEED_JSON_PATH);
    }
  }

  public async seedFromJson(customPath?: string) {
    const filePath = customPath
      ? path.resolve(customPath)
      : path.resolve(process.cwd(), 'src/seeds/base-data.json');
    this.logger.log(`Seeding base data from ${filePath}`);

    const raw = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(raw);

    // helper to upsert by name or unique key
    const upsert = async <E>(
      entity: { new (): E },
      uniqueField: keyof E,
      records: Partial<E>[],
    ) => {
      const repo = this.dataSource.getRepository(entity);
      for (const rec of records) {
        const where: any = {};
        where[uniqueField] = (rec as any)[uniqueField];
        const exists = await repo.findOne({ where });
        if (!exists) {
          await repo.save(repo.create(rec as any));
          this.logger.log(`Inserted ${entity.name} ${where[uniqueField]}`);
        }
      }
    };

    // 1) wave_type_genres
    await upsert(WaveTypeGenre, 'name', json.wave_type_genres);

    // 2) wave_types (resolve genre relation)
    const genreRepo = this.dataSource.getRepository(WaveTypeGenre);
    const typesToInsert: Partial<
      WaveType & { inputSchema: string; outputSchema: string }
    >[] = [];
    for (const wt of json.wave_types) {
      const genre = await genreRepo.findOne({
        where: { name: wt.waveTypeGenreName },
      });
      if (!genre) continue;

      typesToInsert.push({
        name: wt.name,
        description: wt.description,
        waveTypeGenre: genre,
        waveTypeGenreId: genre.waveTypeGenreId,
        inputSchema: JSON.stringify(wt.input),
        outputSchema: JSON.stringify(wt.output),
      });
    }

    await upsert(WaveType, 'name', typesToInsert);

    // 3) node_types
    await upsert(NodeType, 'name', json.node_types);

    // 4) node_exit_types
    await upsert(NodeExitType, 'name', json.node_exit_types);

    // 5) task_statuses
    await upsert(TaskStatus, 'name', json.task_statuses);

    // 6) evaluation_variable_data_types
    await upsert(
      EvaluationVariableDataType,
      'name',
      json.evaluation_variable_data_types,
    );

    // 7) evaluation_operators (link to data types)
    const dataTypeRepo = this.dataSource.getRepository(
      EvaluationVariableDataType,
    );
    const opRepo = this.dataSource.getRepository(EvaluationOperator);

    for (const opDef of json.evaluation_operators) {
      // upsert the operator itself
      let op = await opRepo.findOne({
        where: {
          name: opDef.name,
          choiceType: opDef.choiceType,
        },
      });
      if (!op) {
        op = opRepo.create({
          name: opDef.name,
          symbol: opDef.symbol,
          description: opDef.description,
          choiceType: opDef.choiceType,
        });
      }

      // now resolve the data-type and attach it
      const dt = await dataTypeRepo.findOne({
        where: { name: opDef.dataType },
      });
      if (dt) {
        // initialize the array if needed…
        op.evaluationVariableDataTypes = op.evaluationVariableDataTypes || [];

        // only add if not already linked
        if (
          !op.evaluationVariableDataTypes.some(
            (d) =>
              d.evaluationVariableDataTypeId ===
              dt.evaluationVariableDataTypeId,
          )
        ) {
          op.evaluationVariableDataTypes.push(dt);
        }
      }

      await opRepo.save(op);
      this.logger.log(
        `Upserted operator ${op.name} with data-types [${op.evaluationVariableDataTypes.map((d) => d.name).join(', ')}]`,
      );
    }

    this.logger.log('Seeding complete');
  }
}
