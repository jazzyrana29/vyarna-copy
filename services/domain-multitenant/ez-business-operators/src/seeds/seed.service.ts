import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { BusinessUnit } from '../entities/business-unit.entity';
import { Operator } from '../entities/operator.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap(): Promise<void> {
    if (process.env.AUTO_SEED === 'true') {
      await this.seedFromJson(process.env.SEED_JSON_PATH);
    }
  }

  public async seedFromJson(customPath?: string): Promise<void> {
    const filePath = customPath
      ? path.resolve(customPath)
      : path.resolve(process.cwd(), 'src/seeds/base-data.json');
    this.logger.log(`Seeding base data from ${filePath}`);

    const raw = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(raw);

    // — 1) business_units —
    const buRepo = this.dataSource.getRepository(BusinessUnit);
    for (const def of json.business_units) {
      let bu = await buRepo.findOne({ where: { name: def.name } });
      if (!bu) {
        bu = buRepo.create({ name: def.name });
        if (def.parentBusinessUnitName) {
          const parent = await buRepo.findOne({
            where: { name: def.parentBusinessUnitName },
          });
          if (parent) {
            bu.parentBusinessUnit = parent;
          }
        }
        await buRepo.save(bu);
        this.logger.log(`Inserted BusinessUnit ${bu.name}`);
      }
    }

    // — 2) operators —
    const opRepo = this.dataSource.getRepository(Operator);

    for (const def of json.operators) {
      // find by unique (username + rootBusinessUnitId)
      const rootBu = await buRepo.findOne({
        where: { name: def.rootBusinessUnitName },
      });
      let op = rootBu
        ? await opRepo.findOne({
            where: {
              username: def.username,
              rootBusinessUnitId: rootBu.businessUnitId,
            },
          })
        : null;

      if (!op && rootBu) {
        const bu = await buRepo.findOne({
          where: { name: def.businessUnitName },
        });
        const newOp = opRepo.create({
          username: def.username,
          nameFirst: def.nameFirst,
          nameMiddle: def.nameMiddle || null,
          nameLast: def.nameLast,
          email: def.email,
          password: def.password,
          businessUnitId: bu.businessUnitId,
          rootBusinessUnitId: rootBu.businessUnitId,
        });
        await opRepo.save(newOp);
        this.logger.log(
          `Inserted Operator ${newOp.username} under BU ${bu.name}`,
        );
      }
    }

    this.logger.log('Seeding complete');
  }
}
