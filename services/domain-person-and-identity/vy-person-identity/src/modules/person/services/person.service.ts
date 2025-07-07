import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ZtrackingPersonService } from "./ztracking-person.service";
import { ActiveCampaignService } from "./active-campaign.service";
import { LogStreamLevel } from "ez-logger";

import { getLoggerConfig } from "../../../utils/common";
import { Person } from "../../../entities/person.entity";

import {
  CreatePersonDto,
  GetManyPersonsDto,
  GetPersonDto,
  PersonDto,
  PaginatedPersonsResponseDto,
  UpdatePersonDto,
} from "ez-utils";
import { BusinessUnit } from "../../../entities/business-unit.entity";
import { Email } from "../../../entities/email.entity";

@Injectable()
export class PersonService {
  private logger = getLoggerConfig(PersonService.name);

  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(BusinessUnit)
    private readonly businessUnitRepository: Repository<BusinessUnit>,
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
    private readonly ztrackingPersonService: ZtrackingPersonService,
    private readonly activeCampaignService: ActiveCampaignService,
  ) {
    this.logger.debug(
      `${PersonService.name} initialized`,
      "",
      "constructor",
      LogStreamLevel.DebugLight,
    );
  }

  async createPerson(
    createPersonDto: CreatePersonDto,
    traceId: string,
  ): Promise<any> {
    this.logger.log(
      `createPersonDto : ${JSON.stringify(createPersonDto)}`,
      traceId,
      "createPerson",
      LogStreamLevel.ProdStandard,
    );

    let rootBusinessUnit = await this.businessUnitRepository.findOne({
      where: { businessUnitId: createPersonDto.businessUnitId },
    });
    while (rootBusinessUnit.parentBusinessUnitId) {
      rootBusinessUnit = await this.businessUnitRepository.findOne({
        where: { businessUnitId: rootBusinessUnit.parentBusinessUnitId },
      });
    }

    const conflictUser = await this.personRepository.findOne({
      where: {
        username: createPersonDto.username,
        rootBusinessUnitId: rootBusinessUnit.businessUnitId,
      },
    });
    if (conflictUser) {
      throw new BadRequestException(
        `Username "${createPersonDto.username}" already exists in the root business unit "${rootBusinessUnit.businessUnitId}"`,
      );
    }

    const conflictEmail = await this.emailRepository.findOne({
      where: { email: createPersonDto.email },
    });
    if (conflictEmail) {
      throw new BadRequestException(
        `Email "${createPersonDto.email}" is already in use`,
      );
    }

    const person = await this.personRepository.save(
      this.personRepository.create({
        ...createPersonDto,
        rootBusinessUnitId: rootBusinessUnit.businessUnitId,
      }),
    );

    await this.emailRepository.save(
      this.emailRepository.create({
        personId: person.personId,
        email: createPersonDto.email,
        isPrimary: true,
      }),
    );

    this.logger.info(
      `person entity saved in database`,
      traceId,
      "createPerson",
      LogStreamLevel.ProdStandard,
    );

    try {
      await this.activeCampaignService.createContact({
        firstName: person.nameFirst,
        lastName: person.nameLastFirst,
        email: createPersonDto.email,
      });
    } catch (err) {
      this.logger.error(
        `Failed to create ActiveCampaign contact`,
        traceId,
        "createPerson",
        LogStreamLevel.ProdStandard,
      );
    }

    if (
      await this.ztrackingPersonService.createZtrackingPersonEntity(
        person,
        traceId,
      )
    )
      return person;
  }

  async updatePersonUnit(
    updatePersonDto: UpdatePersonDto,
    traceId: string,
  ): Promise<any> {
    const person = await this.personRepository.findOne({
      where: { personId: updatePersonDto.personId },
    });

    if (!person) {
      throw new NotFoundException(
        `no person existed with this id => ${updatePersonDto.personId}`,
      );
    }
    const updatedPerson = await this.personRepository.save(updatePersonDto);

    this.logger.info(
      `person entity updated in database`,
      traceId,
      "updatedBusinessUnit",
      LogStreamLevel.ProdStandard,
    );

    if (
      await this.ztrackingPersonService.createZtrackingPersonEntity(
        updatedPerson,
        traceId,
      )
    )
      return updatedPerson;
  }

  async findPerson(
    { personId = "", nameFirst = "", isDeleted = false }: GetPersonDto,
    traceId: string,
  ): Promise<Person> {
    if (!personId && !nameFirst) {
      throw new NotFoundException(
        "At least one parameter (personId or nameFirst) must be provided",
      );
    }

    const where = {};
    if (personId) where["personId"] = personId;
    if (nameFirst) where["nameFirst"] = nameFirst;
    where["isDeleted"] = isDeleted;

    const person = await this.personRepository.findOne({
      where,
    });

    if (!person) {
      throw new NotFoundException(`No person found with the provided criteria`);
    }

    this.logger.info(
      `Person entity found in database`,
      traceId,
      "findBusinessUnit",
      LogStreamLevel.ProdStandard,
    );

    return person;
  }

  async getManyPersons(
    getManyPersonsDto: GetManyPersonsDto,
    traceId: string,
  ): Promise<PaginatedPersonsResponseDto> {
    const {
      username,
      nameFirst,
      nameMiddle,
      nameLast,
      email,
      businessUnitId,
      rootBusinessUnitId,
      isDeleted,
      updatedBy,
      pagination,
      sort = [],
    } = getManyPersonsDto;

    // 1) Build dynamic WHERE filters
    const where: Record<string, any> = {
      ...(username && { username }),
      ...(nameFirst && { nameFirst }),
      ...(nameMiddle && { nameMiddle }),
      ...(nameLast && { nameLast }),
      ...(email && { email }),
      ...(businessUnitId && { businessUnitId }),
      ...(rootBusinessUnitId && { rootBusinessUnitId }),
      ...(typeof isDeleted === "boolean" && { isDeleted }),
      ...(updatedBy && { updatedBy }),
    };

    this.logger.debug(
      `Filters for getManyPersons: ${JSON.stringify(where)}`,
      traceId,
      "getManyPersons",
      LogStreamLevel.ProdStandard,
    );

    // 2) Build base QueryBuilder and join relations
    let query = this.personRepository
      .createQueryBuilder("person")
      .where(where)
      .leftJoinAndSelect("person.businessUnit", "businessUnit")
      .leftJoinAndSelect("person.rootBusinessUnit", "rootBusinessUnit");

    // 3) Apply sorting (or default by creation date)
    if (Array.isArray(sort) && sort.length > 0) {
      sort.forEach((s, idx) => {
        const field = `person.${s.by}`;
        if (idx === 0) {
          query = query.orderBy(field, s.order);
        } else {
          query = query.addOrderBy(field, s.order);
        }
      });
    } else {
      query = query.orderBy("person.createdAt", "ASC");
    }

    // 4) Get total count for pagination
    const totalCount = await query.getCount();

    let isPaginated = false;
    let maxPages: number | null = null;
    let currentPage: number | null = null;
    let usedPageSize: number | null = null;

    // 5) Apply pagination if requested
    if (pagination) {
      isPaginated = true;
      const { page = 1, pageSize = 25 } = pagination;
      const skip = (page - 1) * pageSize;
      query = query.skip(skip).take(pageSize);

      maxPages = Math.ceil(totalCount / pageSize);
      currentPage = page;
      usedPageSize = pageSize;
    }

    // 6) Execute query
    const persons = await query.getMany();
    this.logger.info(
      `${persons.length} person(s) found`,
      traceId,
      "getManyPersons",
      LogStreamLevel.ProdStandard,
    );

    // 7) Return structured pagination & sorting response
    return {
      data: persons as unknown as PersonDto[],
      maxPages,
      currentPage,
      pageSize: usedPageSize,
      isPaginated,
    };
  }
}
