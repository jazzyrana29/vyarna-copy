import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LogStreamLevel } from "ez-logger";
import { getLoggerConfig } from "../../../utils/common";
import { Person } from "../../../entities/person.entity";
import { ZtrackingPerson } from "../../../entities/ztracking-person.entity";
import { GetHistoryOfPersonDto } from "ez-utils";

@Injectable()
export class ZtrackingPersonService {
  private logger = getLoggerConfig(ZtrackingPersonService.name);

  constructor(
    @InjectRepository(ZtrackingPerson)
    private ztrackingPersonRepository: Repository<ZtrackingPerson>,
  ) {
    this.logger.debug(
      `${ZtrackingPersonService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async createZtrackingPersonEntity(
    person: Person,
    traceId: string,
  ): Promise<boolean> {
    const ztrackingBusinessUnit = await this.ztrackingPersonRepository.save(
      this.ztrackingPersonRepository.create({
        ...person,
        versionDate: new Date(),
      }),
    );
    this.logger.info(
      `ztracking person entity saved in database`,
      traceId,
      "createZtrackingPersonEntity",
      LogStreamLevel.ProdStandard,
    );

    return Boolean(ztrackingBusinessUnit?.ztrackingVersion);
  }

  async findZtrackingPersonEntity(
    { personId }: GetHistoryOfPersonDto,
    traceId: string,
  ): Promise<ZtrackingPerson[]> {
    const ztrackingPersons = await this.ztrackingPersonRepository.find({
      where: { personId },
    });

    if (!ztrackingPersons.length) {
      throw new NotFoundException(
        `no ztracking of persons existed with this id => ${personId}`,
      );
    }

    this.logger.info(
      `ztracking persons entities found in database`,
      traceId,
      "findZtrackingPersonEntity",
      LogStreamLevel.ProdStandard,
    );

    return ztrackingPersons;
  }
}
