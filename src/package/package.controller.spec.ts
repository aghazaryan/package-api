import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { Package } from './package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { GenericContainer, StartedTestContainer } from 'testcontainers';

describe('PackageController', () => {
  let controller: PackageController;
  let service: PackageService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Package>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let postgresContainer: StartedTestContainer;

  beforeEach(async () => {
    postgresContainer = await new GenericContainer('postgres')
      .withEnvironment({ POSTGRES_USER: 'testuser' })
      .withEnvironment({ POSTGRES_PASSWORD: 'testpassword' })
      .withEnvironment({ POSTGRES_DB: 'testdb' })
      .withExposedPorts(5432)
      .start();

    const databaseHost = postgresContainer.getHost();
    const databasePort = postgresContainer.getMappedPort(5432);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: databaseHost,
          port: databasePort,
          username: 'testuser',
          password: 'testpassword',
          database: 'testdb',
          entities: [Package],
          synchronize: true, // Not recommended for production but fine for testing
        }),
        TypeOrmModule.forFeature([Package]),
      ],
      providers: [PackageService],
      controllers: [PackageController],
    }).compile();
    controller = module.get<PackageController>(PackageController);
    service = module.get<PackageService>(PackageService);
    repository = module.get<Repository<Package>>(getRepositoryToken(Package));
  });

  afterAll(async () => {
    await postgresContainer.stop();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a package', async () => {
    const createPackageDto: CreatePackageDto = {
      color: 'red',
      name: 'Box',
      length: 10,
      width: 10,
      height: 10,
      weight: 2,
      quantity: 1,
      stackable: true,
      tiltable: false,
    };
    const packageEntity = { ...createPackageDto, id: 1 };

    jest.spyOn(service, 'create').mockResolvedValue(packageEntity);

    expect(await controller.create(createPackageDto)).toEqual(packageEntity);
  });

  it('should find all packages', async () => {
    const packageEntities = [
      {
        id: 1,
        color: 'red',
        name: 'Box',
        length: 10,
        width: 10,
        height: 10,
        weight: 2,
        quantity: 1,
        stackable: true,
        tiltable: false,
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(packageEntities);

    expect(await controller.findAll()).toEqual(packageEntities);
  });

  it('should find one package', async () => {
    const packageEntity = {
      id: 1,
      color: 'red',
      name: 'Box',
      length: 10,
      width: 10,
      height: 10,
      weight: 2,
      quantity: 1,
      stackable: true,
      tiltable: false,
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(packageEntity);

    expect(await controller.findOne(1)).toEqual(packageEntity);
  });

  it('should update a package', async () => {
    const updatePackageDto = {
      color: 'blue',
      name: 'Box',
      length: 15,
      width: 15,
      height: 15,
      weight: 3,
      quantity: 2,
      stackable: false,
      tiltable: true,
    };
    const packageEntity: Package = { ...updatePackageDto, id: 1 };

    jest.spyOn(service, 'update').mockResolvedValue(packageEntity);

    expect(await controller.update(1, updatePackageDto)).toEqual(packageEntity);
  });

  it('should remove a package', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();

    expect(await controller.remove(1)).toBeUndefined();
  });
});
