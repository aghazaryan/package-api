import { Test, TestingModule } from '@nestjs/testing';
import { PackageService } from './package.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Package } from './package.entity';
import { Repository } from 'typeorm';

describe('PackageService', () => {
  let service: PackageService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repo: Repository<Package>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackageService,
        {
          provide: getRepositoryToken(Package),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PackageService>(PackageService);
    repo = module.get<Repository<Package>>(getRepositoryToken(Package));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests for each CRUD operation
});
