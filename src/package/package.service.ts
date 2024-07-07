import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { BulkCreatePackageDto } from './dto/bulk-create-package.dto';
import { BulkUpdatePackageDto } from './dto/bulk-update-package.dto';

@Injectable()
export class PackageService {
  private readonly logger = new Logger(PackageService.name);

  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  create(createPackageDto: CreatePackageDto): Promise<Package> {
    const newPackage = this.packageRepository.create(createPackageDto);
    return this.packageRepository.save(newPackage);
  }

  createBulk(bulkCreatePackageDto: BulkCreatePackageDto): Promise<Package[]> {
    const newPackages = this.packageRepository.create(
      bulkCreatePackageDto.packages,
    );
    return this.packageRepository.save(newPackages);
  }

  findAll(offset: number, limit: number): Promise<Package[]> {
    return this.packageRepository.find({
      skip: offset,
      take: limit,
    });
  }

  findOne(id: number): Promise<Package> {
    return this.packageRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updatePackageDto: UpdatePackageDto,
  ): Promise<Package> {
    await this.packageRepository.update(id, updatePackageDto);
    const updatedPackage = await this.packageRepository.findOne({
      where: { id },
    });
    if (!updatedPackage) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return updatedPackage;
  }

  async updateBulk(
    bulkUpdatePackageDto: BulkUpdatePackageDto,
  ): Promise<Package[]> {
    const updatePromises = bulkUpdatePackageDto.packages.map(async (pkg) => {
      try {
        return this.update(pkg.id, pkg);
      } catch (error) {
        this.logger.warn(
          `Failed to update package with ID ${pkg.id}: ${error.message}`,
        );
        return null;
      }
    });

    const results = await Promise.allSettled(updatePromises);
    return results
      .filter(
        (result) => result.status === 'fulfilled' && result.value !== null,
      )
      .map((result: any) => result.value);
  }

  async remove(id: number): Promise<void> {
    await this.packageRepository.delete(id);
  }

  async removeBulk(ids: number[]): Promise<void> {
    await this.packageRepository.delete(ids);
  }
}
