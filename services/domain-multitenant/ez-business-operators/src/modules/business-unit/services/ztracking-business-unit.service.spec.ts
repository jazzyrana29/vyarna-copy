import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingBusinessUnitService } from './ztracking-business-unit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingBusinessUnit } from '../../../entities/ztracking-business-unit.entity';
import { MockType, repositoryMockFactory } from 'ez-utils';
import {
  mockSavedBusinessUnitCase001,
  mockSavedZtrackingBusinessUnitCase001,
  mockTraceId,
} from '../test-values.spec';

describe('ZtrackingBusinessUnitService', () => {
  let ztrackingBusinessUnitService: ZtrackingBusinessUnitService;
  let ztrackingBusinessUnitRepository: MockType<
    Repository<ZtrackingBusinessUnit>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingBusinessUnitService,
        {
          provide: getRepositoryToken(ZtrackingBusinessUnit),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    ztrackingBusinessUnitService = module.get<ZtrackingBusinessUnitService>(
      ZtrackingBusinessUnitService,
    );
    ztrackingBusinessUnitRepository = module.get(
      getRepositoryToken(ZtrackingBusinessUnit),
    );
  });

  it('should be defined', () => {
    expect(ztrackingBusinessUnitService).toBeDefined();
  });

  describe('createZtrackingBusinessUnitEntity', () => {
    it('should create a ztracking business unit entity successfully', async () => {
      const traceId = mockTraceId;
      const businessUnit = mockSavedBusinessUnitCase001;
      const mockZtrackingBusinessUnit = mockSavedZtrackingBusinessUnitCase001;

      jest
        .spyOn(ztrackingBusinessUnitRepository, 'save')
        .mockResolvedValue(mockZtrackingBusinessUnit as any);

      const result =
        await ztrackingBusinessUnitService.createZtrackingBusinessUnitEntity(
          businessUnit,
          traceId,
        );

      expect(result).toEqual(true);
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const traceId = mockTraceId;
      const businessUnit = mockSavedBusinessUnitCase001;

      jest
        .spyOn(ztrackingBusinessUnitRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        ztrackingBusinessUnitService.createZtrackingBusinessUnitEntity(
          businessUnit,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingBusinessUnitEntity', () => {
    it('should find ztracking business unit entities based on criteria', async () => {
      const traceId = mockTraceId;
      const businessUnitId =
        mockSavedZtrackingBusinessUnitCase001.businessUnitId;
      const mockZtrackingBusinessUnits = [
        mockSavedZtrackingBusinessUnitCase001,
      ];

      jest
        .spyOn(ztrackingBusinessUnitRepository, 'find')
        .mockResolvedValue(mockZtrackingBusinessUnits as any);

      const result =
        await ztrackingBusinessUnitService.findZtrackingBusinessUnitEntity(
          { businessUnitId },
          traceId,
        );

      expect(result).toEqual(mockZtrackingBusinessUnits);
    });

    it('should handle errors gracefully when finding ztracking entities', async () => {
      const traceId = mockTraceId;
      const businessUnitId = mockSavedBusinessUnitCase001.businessUnitId;

      jest
        .spyOn(ztrackingBusinessUnitRepository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        ztrackingBusinessUnitService.findZtrackingBusinessUnitEntity(
          { businessUnitId },
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });
});
