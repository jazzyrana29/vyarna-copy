import { Test, TestingModule } from '@nestjs/testing';
import { ZtrackingPermissionProfileManagedThroughMechanismPermitService } from './ztracking-permission-profile-managed-through-mechanism-permit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZtrackingPermissionProfileManagedThroughMechanismPermit } from '../../../entities/ztracking-permission-profile-managed-through-mechanism-permit.entity';
import { MockType, repositoryMockFactory } from 'ez-utils';
import {
  mockSavedPermissionProfileManagedThroughMechanismPermit,
  mockSavedZtrackingPermissionProfileManagedThroughMechanismPermit,
  mockTraceId,
} from '../test-values.spec';

describe('ZtrackingPermissionProfileManagedThroughMechanismPermitService', () => {
  let ztrackingService: ZtrackingPermissionProfileManagedThroughMechanismPermitService;
  let ztrackingRepository: MockType<
    Repository<ZtrackingPermissionProfileManagedThroughMechanismPermit>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZtrackingPermissionProfileManagedThroughMechanismPermitService,
        {
          provide: getRepositoryToken(
            ZtrackingPermissionProfileManagedThroughMechanismPermit,
          ),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    ztrackingService =
      module.get<ZtrackingPermissionProfileManagedThroughMechanismPermitService>(
        ZtrackingPermissionProfileManagedThroughMechanismPermitService,
      );
    ztrackingRepository = module.get(
      getRepositoryToken(
        ZtrackingPermissionProfileManagedThroughMechanismPermit,
      ),
    );
  });

  it('should be defined', () => {
    expect(ztrackingService).toBeDefined();
  });

  describe('createZtrackingPermissionProfileManagedThroughMechanismPermitEntity', () => {
    it('should create a ztracking entity successfully', async () => {
      const traceId = mockTraceId;
      const entity = mockSavedPermissionProfileManagedThroughMechanismPermit;
      const mockZtrackingEntity =
        mockSavedZtrackingPermissionProfileManagedThroughMechanismPermit;

      jest
        .spyOn(ztrackingRepository, 'save')
        .mockResolvedValue(mockZtrackingEntity as any);

      const result =
        await ztrackingService.createZtrackingPermissionProfileManagedThroughMechanismPermitEntity(
          entity,
          traceId,
        );

      expect(result).toEqual(true);
      expect(ztrackingRepository.save).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should handle errors gracefully when creating a ztracking entity', async () => {
      const traceId = mockTraceId;
      const entity = mockSavedPermissionProfileManagedThroughMechanismPermit;

      jest
        .spyOn(ztrackingRepository, 'save')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        ztrackingService.createZtrackingPermissionProfileManagedThroughMechanismPermitEntity(
          entity,
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findZtrackingPermissionProfileManagedThroughMechanismPermitEntities', () => {
    it('should find ztracking entities based on criteria', async () => {
      const traceId = mockTraceId;
      const mechanismPermitId =
        mockSavedZtrackingPermissionProfileManagedThroughMechanismPermit.mechanismPermitId;
      const mockZtrackingEntities = [
        mockSavedZtrackingPermissionProfileManagedThroughMechanismPermit,
      ];

      jest
        .spyOn(ztrackingRepository, 'find')
        .mockResolvedValue(mockZtrackingEntities as any);

      const result =
        await ztrackingService.findZtrackingPermissionProfileManagedThroughMechanismPermitEntities(
          { mechanismPermitId },
          traceId,
        );

      expect(result).toEqual(mockZtrackingEntities);
      expect(ztrackingRepository.find).toHaveBeenCalledWith({
        where: { mechanismPermitId },
      });
    });

    it('should handle errors gracefully when finding ztracking entities', async () => {
      const traceId = mockTraceId;
      const mechanismPermitId =
        mockSavedZtrackingPermissionProfileManagedThroughMechanismPermit.mechanismPermitId;

      jest
        .spyOn(ztrackingRepository, 'find')
        .mockRejectedValue(new Error('Database error'));

      await expect(
        ztrackingService.findZtrackingPermissionProfileManagedThroughMechanismPermitEntities(
          { mechanismPermitId },
          traceId,
        ),
      ).rejects.toThrow('Database error');
    });
  });
});
