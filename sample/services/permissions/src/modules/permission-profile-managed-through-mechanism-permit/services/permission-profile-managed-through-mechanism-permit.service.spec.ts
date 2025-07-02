import { Test, TestingModule } from '@nestjs/testing';
import { PermissionProfileManagedThroughMechanismPermitService } from './permission-profile-managed-through-mechanism-permit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionProfileManagedThroughMechanismPermit } from '../../../entities/permission-profile-managed-through-mechanism-permit.entity';
import { ZtrackingPermissionProfileManagedThroughMechanismPermitService } from './ztracking-permission-profile-managed-through-mechanism-permit.service';
import { CreatePermissionProfileManagedThroughMechanismPermitDto } from '../DTO/permission-profile-managed-through-mechanism-permit-create.dto';
import { UpdatePermissionProfileManagedThroughMechanismPermitDto } from '../DTO/permission-profile-managed-through-mechanism-permit-update.dto';
import { LogStreamLevel } from 'ez-logger';
import { MockType, repositoryMockFactory } from 'ez-utils';
import {
  mockCreatePermissionProfileManagedThroughMechanismPermitDto,
  mockSavedPermissionProfileManagedThroughMechanismPermit,
  mockTraceId,
  mockUpdatePermissionProfileManagedThroughMechanismPermitDto,
} from '../test-values.spec';
import { NotFoundException } from '@nestjs/common';

describe('PermissionProfileManagedThroughMechanismPermitService', () => {
  let service: PermissionProfileManagedThroughMechanismPermitService;
  let ztrackingService: ZtrackingPermissionProfileManagedThroughMechanismPermitService;
  let repository: MockType<
    Repository<PermissionProfileManagedThroughMechanismPermit>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionProfileManagedThroughMechanismPermitService,
        {
          provide: getRepositoryToken(
            PermissionProfileManagedThroughMechanismPermit,
          ),
          useFactory: repositoryMockFactory,
        },
        {
          provide:
            ZtrackingPermissionProfileManagedThroughMechanismPermitService,
          useValue: {
            createZtrackingPermissionProfileManagedThroughMechanismPermitEntity:
              jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PermissionProfileManagedThroughMechanismPermitService>(
      PermissionProfileManagedThroughMechanismPermitService,
    );
    repository = module.get(
      getRepositoryToken(PermissionProfileManagedThroughMechanismPermit),
    );
    ztrackingService =
      module.get<ZtrackingPermissionProfileManagedThroughMechanismPermitService>(
        ZtrackingPermissionProfileManagedThroughMechanismPermitService,
      );
  });

  describe('create', () => {
    it('should successfully create an entry with valid data', async () => {
      const createDto: CreatePermissionProfileManagedThroughMechanismPermitDto =
        mockCreatePermissionProfileManagedThroughMechanismPermitDto;
      const traceId = mockTraceId;
      const savedEntry =
        mockSavedPermissionProfileManagedThroughMechanismPermit;

      jest.spyOn(repository, 'save').mockResolvedValue(savedEntry as any);
      jest.spyOn(repository, 'create').mockReturnValue(savedEntry as any);
      jest
        .spyOn(
          ztrackingService,
          'createZtrackingPermissionProfileManagedThroughMechanismPermitEntity',
        )
        .mockResolvedValue(true);

      const result =
        await service.createPermissionProfileManagedThroughMechanismPermit(
          createDto,
          traceId,
        );

      expect(repository.save).toHaveBeenCalledWith(savedEntry);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(
        ztrackingService.createZtrackingPermissionProfileManagedThroughMechanismPermitEntity,
      ).toHaveBeenCalledWith(savedEntry, traceId);
      expect(result).toEqual(savedEntry);
    });

    it('should log the creation process with correct traceId and log level', async () => {
      const createDto: CreatePermissionProfileManagedThroughMechanismPermitDto =
        mockCreatePermissionProfileManagedThroughMechanismPermitDto;
      const traceId = mockTraceId;
      const savedEntry =
        mockSavedPermissionProfileManagedThroughMechanismPermit;

      jest.spyOn(repository, 'save').mockResolvedValue(savedEntry as any);
      jest.spyOn(repository, 'create').mockReturnValue(savedEntry as any);
      jest
        .spyOn(
          ztrackingService,
          'createZtrackingPermissionProfileManagedThroughMechanismPermitEntity',
        )
        .mockResolvedValue(true);

      const logSpy = jest.spyOn(service['logger'], 'log');
      const infoSpy = jest.spyOn(service['logger'], 'info');

      await service.createPermissionProfileManagedThroughMechanismPermit(
        createDto,
        traceId,
      );

      expect(logSpy).toHaveBeenCalledWith(
        `createDto : ${JSON.stringify(createDto)}`,
        traceId,
        'createPermissionProfileManagedThroughMechanismPermit',
        LogStreamLevel.ProdStandard,
      );

      expect(infoSpy).toHaveBeenCalledWith(
        `PermissionProfileManagedThroughMechanismPermit entity saved in database`,
        traceId,
        'createPermissionProfileManagedThroughMechanismPermit',
        LogStreamLevel.ProdStandard,
      );
    });

    // Additional tests for error scenarios can be added here
  });

  describe('updatePermissionProfileManagedThroughMechanismPermit', () => {
    it('should successfully update an entry with valid data', async () => {
      const updateDto: UpdatePermissionProfileManagedThroughMechanismPermitDto =
        mockUpdatePermissionProfileManagedThroughMechanismPermitDto;
      const traceId = mockTraceId;
      const existingEntry =
        mockSavedPermissionProfileManagedThroughMechanismPermit;
      const updatedEntry =
        mockUpdatePermissionProfileManagedThroughMechanismPermitDto;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingEntry as any);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedEntry as any);
      jest
        .spyOn(
          ztrackingService,
          'createZtrackingPermissionProfileManagedThroughMechanismPermitEntity',
        )
        .mockResolvedValue(true);

      const result =
        await service.updatePermissionProfileManagedThroughMechanismPermit(
          updateDto.mechanismPermitId,
          updateDto.permissionProfileId,
          updateDto,
          traceId,
        );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          mechanismPermitId: updateDto.mechanismPermitId,
          permissionProfileId: updateDto.permissionProfileId,
        },
      });
      expect(repository.save).toHaveBeenCalledWith(existingEntry);
      expect(
        ztrackingService.createZtrackingPermissionProfileManagedThroughMechanismPermitEntity,
      ).toHaveBeenCalledWith(updatedEntry, traceId);
      expect(result).toEqual(updatedEntry);
    });

    it('should throw NotFoundException if entry is not found', async () => {
      const updateDto: UpdatePermissionProfileManagedThroughMechanismPermitDto =
        mockUpdatePermissionProfileManagedThroughMechanismPermitDto;
      const traceId = mockTraceId;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updatePermissionProfileManagedThroughMechanismPermit(
          updateDto.mechanismPermitId,
          updateDto.permissionProfileId,
          updateDto,
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    // Additional tests for logging and error scenarios can be added here
  });

  describe('findAllPermissionProfileManagedThroughMechanismPermit', () => {
    it('should find all entries', async () => {
      const traceId = mockTraceId;
      const mockResults = [
        mockSavedPermissionProfileManagedThroughMechanismPermit,
      ];
      const expectedResults = mockResults.map((result) => ({
        mechanismPermitId: result.mechanismPermitId,
        permissionProfileId: result.permissionProfileId,
        isPermitted: result.isPermitted,
      }));

      jest.spyOn(repository, 'find').mockResolvedValue(mockResults as any);

      const infoSpy = jest.spyOn(service['logger'], 'info');

      const results =
        await service.findAllPermissionProfileManagedThroughMechanismPermit(
          traceId,
        );

      expect(results).toEqual(expectedResults);
      expect(repository.find).toHaveBeenCalled();
      expect(infoSpy).toHaveBeenCalledWith(
        `Retrieved ${mockResults.length} PermissionProfileManagedThroughMechanismPermit entities`,
        traceId,
        'findAllPermissionProfileManagedThroughMechanismPermit',
        LogStreamLevel.ProdStandard,
      );
    });
  });

  describe('findPermissionProfileManagedThroughMechanismPermit', () => {
    it('should find an entry by mechanismPermitId and permissionProfileId', async () => {
      const traceId = mockTraceId;
      const mechanismPermitId =
        mockSavedPermissionProfileManagedThroughMechanismPermit.mechanismPermitId;
      const permissionProfileId =
        mockSavedPermissionProfileManagedThroughMechanismPermit.permissionProfileId;
      const mockEntry = mockSavedPermissionProfileManagedThroughMechanismPermit;

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockEntry as any);

      const infoSpy = jest.spyOn(service['logger'], 'info');

      const result =
        await service.findPermissionProfileManagedThroughMechanismPermit(
          mechanismPermitId,
          permissionProfileId,
          traceId,
        );

      expect(result).toEqual(mockEntry);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { mechanismPermitId, permissionProfileId },
      });
      expect(infoSpy).toHaveBeenCalledWith(
        `PermissionProfileManagedThroughMechanismPermit entity found in database`,
        traceId,
        'findPermissionProfileManagedThroughMechanismPermit',
        LogStreamLevel.ProdStandard,
      );
    });

    it('should throw NotFoundException if entry is not found', async () => {
      const traceId = mockTraceId;
      const mechanismPermitId =
        mockSavedPermissionProfileManagedThroughMechanismPermit.mechanismPermitId;
      const permissionProfileId =
        mockSavedPermissionProfileManagedThroughMechanismPermit.permissionProfileId;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.findPermissionProfileManagedThroughMechanismPermit(
          mechanismPermitId,
          permissionProfileId,
          traceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
