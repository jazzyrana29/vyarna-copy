import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationVariableCollectionPortfolioService } from './evaluation-variable-collection-portfolio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluationVariableCollectionPortfolio } from '../../../entities/evaluation-variable-collection-portfolio.entity';
import { Repository } from 'typeorm';
import {
  mockCreateEvaluationVariableCollectionPortfolioDto,
  mockSavedEvaluationVariableCollectionPortfolio001,
  mockUpdateEvaluationVariableCollectionPortfolioDto,
  mockDeleteEvaluationVariableCollectionPortfolioDto,
  mockGetOneEvaluationVariableCollectionPortfolioDto,
  mockGetManyEvaluationVariableCollectionPortfoliosDto,
  mockTraceId,
} from '../test-values.spec';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ZtrackingEvaluationVariableCollectionPortfolioService } from './ztracking-evaluation-variable-collection-portfolio.service';

describe('EvaluationVariableCollectionPortfolioService', () => {
  let service: EvaluationVariableCollectionPortfolioService;
  let repository: jest.Mocked<
    Repository<EvaluationVariableCollectionPortfolio>
  >;
  let ztrackingService: jest.Mocked<ZtrackingEvaluationVariableCollectionPortfolioService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationVariableCollectionPortfolioService,
        {
          provide: getRepositoryToken(EvaluationVariableCollectionPortfolio),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ZtrackingEvaluationVariableCollectionPortfolioService,
          useValue: {
            createZtrackingEvaluationVariableCollectionPortfolioEntity: jest
              .fn()
              .mockResolvedValue(true),
            findZtrackingEvaluationVariableCollectionPortfolioEntity: jest
              .fn()
              .mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<EvaluationVariableCollectionPortfolioService>(
      EvaluationVariableCollectionPortfolioService,
    );
    repository = module.get(
      getRepositoryToken(EvaluationVariableCollectionPortfolio),
    );
    ztrackingService = module.get(
      ZtrackingEvaluationVariableCollectionPortfolioService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(ztrackingService).toBeDefined();
  });

  describe('createEvaluationVariableCollectionPortfolio', () => {
    it('should create an evaluation variable collection portfolio and track changes', async () => {
      jest
        .spyOn(repository, 'create')
        .mockReturnValue(mockSavedEvaluationVariableCollectionPortfolio001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedEvaluationVariableCollectionPortfolio001);

      const result = await service.createEvaluationVariableCollectionPortfolio(
        mockCreateEvaluationVariableCollectionPortfolioDto,
        mockTraceId,
      );

      expect(repository.create).toHaveBeenCalledWith(
        mockCreateEvaluationVariableCollectionPortfolioDto,
      );
      expect(repository.save).toHaveBeenCalledWith(
        mockSavedEvaluationVariableCollectionPortfolio001,
      );
      expect(
        ztrackingService.createZtrackingEvaluationVariableCollectionPortfolioEntity,
      ).toHaveBeenCalledWith(
        mockSavedEvaluationVariableCollectionPortfolio001,
        mockTraceId,
      );
      expect(result).toEqual(mockSavedEvaluationVariableCollectionPortfolio001);
    });
  });

  describe('updateEvaluationVariableCollectionPortfolio', () => {
    it('should throw NotFoundException if portfolio does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateEvaluationVariableCollectionPortfolio(
          mockUpdateEvaluationVariableCollectionPortfolioDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update an evaluation variable collection portfolio and track changes', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedEvaluationVariableCollectionPortfolio001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedEvaluationVariableCollectionPortfolio001);

      const result = await service.updateEvaluationVariableCollectionPortfolio(
        mockUpdateEvaluationVariableCollectionPortfolioDto,
        mockTraceId,
      );

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(
          mockUpdateEvaluationVariableCollectionPortfolioDto,
        ),
      );
      expect(
        ztrackingService.createZtrackingEvaluationVariableCollectionPortfolioEntity,
      ).toHaveBeenCalled();
      expect(result).toEqual(mockSavedEvaluationVariableCollectionPortfolio001);
    });
  });

  describe('deleteEvaluationVariableCollectionPortfolio', () => {
    it('should throw NotFoundException if portfolio does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.deleteEvaluationVariableCollectionPortfolio(
          mockDeleteEvaluationVariableCollectionPortfolioDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should mark an evaluation variable collection portfolio as deleted', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedEvaluationVariableCollectionPortfolio001);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockSavedEvaluationVariableCollectionPortfolio001);

      await service.deleteEvaluationVariableCollectionPortfolio(
        mockDeleteEvaluationVariableCollectionPortfolioDto,
        mockTraceId,
      );

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
      );
      expect(
        ztrackingService.createZtrackingEvaluationVariableCollectionPortfolioEntity,
      ).toHaveBeenCalledWith(
        expect.objectContaining({ isDeleted: true }),
        mockTraceId,
      );
    });
  });

  describe('getOneEvaluationVariableCollectionPortfolio', () => {
    it('should throw BadRequestException if neither ID nor name is provided', async () => {
      await expect(
        service.getOneEvaluationVariableCollectionPortfolio(
          { evaluationVariableCollectionPortfolioId: '', name: '' },
          mockTraceId,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if no portfolio is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.getOneEvaluationVariableCollectionPortfolio(
          mockGetOneEvaluationVariableCollectionPortfolioDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a found evaluation variable collection portfolio', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockSavedEvaluationVariableCollectionPortfolio001);

      const result = await service.getOneEvaluationVariableCollectionPortfolio(
        mockGetOneEvaluationVariableCollectionPortfolioDto,
        mockTraceId,
      );

      expect(result).toEqual(mockSavedEvaluationVariableCollectionPortfolio001);
    });
  });

  describe('getManyEvaluationVariableCollectionPortfolios', () => {
    it('should throw NotFoundException if no portfolios match the criteria', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(
        service.getManyEvaluationVariableCollectionPortfolios(
          mockGetManyEvaluationVariableCollectionPortfoliosDto,
          mockTraceId,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return a list of evaluation variable collection portfolios', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockSavedEvaluationVariableCollectionPortfolio001]);

      const result =
        await service.getManyEvaluationVariableCollectionPortfolios(
          mockGetManyEvaluationVariableCollectionPortfoliosDto,
          mockTraceId,
        );

      expect(result).toEqual([
        mockSavedEvaluationVariableCollectionPortfolio001,
      ]);
    });
  });
});
