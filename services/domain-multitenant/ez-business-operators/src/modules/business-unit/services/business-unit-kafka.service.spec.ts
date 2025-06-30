import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUnitKafkaService } from './business-unit-kafka.service';
import { BusinessUnitService } from './business-unit.service';
import { ZtrackingBusinessUnitService } from './ztracking-business-unit.service';

jest.mock('ez-kafka-consumer');
jest.mock('ez-kafka-producer');

describe('BusinessUnitKafkaService', () => {
  let businessUnitKafkaService: BusinessUnitKafkaService;
  let businessUnitService: BusinessUnitService;
  let ztrackingBusinessUnitService: ZtrackingBusinessUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessUnitKafkaService,
        {
          provide: BusinessUnitService,
          useValue: {
            createBusinessUnit: jest.fn(),
            updateBusinessUnit: jest.fn(),
            findBusinessUnit: jest.fn(),
          },
        },
        {
          provide: ZtrackingBusinessUnitService,
          useValue: {
            findZtrackingBusinessUnitEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    businessUnitKafkaService = module.get<BusinessUnitKafkaService>(
      BusinessUnitKafkaService,
    );
    businessUnitService = module.get<BusinessUnitService>(BusinessUnitService);
    ztrackingBusinessUnitService = module.get<ZtrackingBusinessUnitService>(
      ZtrackingBusinessUnitService,
    );
  });

  describe('createBusinessEntityViaKafka', () => {
    it('should be defined', () => {
      expect(businessUnitKafkaService).toBeDefined();
    });
  });
});
