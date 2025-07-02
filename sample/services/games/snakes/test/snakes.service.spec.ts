import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnakesService } from '../src/modules/snakes/services/snakes.service';
import { SnakesRound } from '../src/entities/snakes-round.entity';

describe('SnakesService', () => {
  let service: SnakesService;
  let repo: Repository<SnakesRound>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SnakesService,
        {
          provide: getRepositoryToken(SnakesRound),
          useClass: Repository,
        },
      ],
    }).compile();

    service = moduleRef.get<SnakesService>(SnakesService);
    repo = moduleRef.get(getRepositoryToken(SnakesRound));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });
});
