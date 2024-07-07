import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { BulkCreatePackageDto } from './dto/bulk-create-package.dto';
import { BulkUpdatePackageDto } from './dto/bulk-update-package.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Package } from './package.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @ApiOperation({ summary: 'Create a new package' })
  @ApiResponse({
    status: 201,
    description: 'The package has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createPackageDto: CreatePackageDto): Promise<Package> {
    return this.packageService.create(createPackageDto);
  }

  @ApiOperation({ summary: 'Create multiple packages' })
  @Post('bulk')
  createBulk(
    @Body() bulkCreatePackageDto: BulkCreatePackageDto,
  ): Promise<Package[]> {
    return this.packageService.createBulk(bulkCreatePackageDto);
  }

  @ApiOperation({ summary: 'Get all packages with pagination' })
  @Get()
  findAll(
    @Query() paginationDto: PaginationDto = { offset: 0, limit: 10 },
  ): Promise<Package[]> {
    return this.packageService.findAll(
      paginationDto.offset,
      paginationDto.limit,
    );
  }

  @ApiOperation({ summary: 'Get a package by ID' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Package> {
    return this.packageService.findOne(id);
  }

  @ApiOperation({ summary: 'Update multiple packages' })
  @Patch('bulk')
  updateBulk(
    @Body() bulkUpdatePackageDto: BulkUpdatePackageDto,
  ): Promise<Package[]> {
    return this.packageService.updateBulk(bulkUpdatePackageDto);
  }

  @ApiOperation({ summary: 'Update a package by ID' })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePackageDto: UpdatePackageDto,
  ): Promise<Package> {
    return this.packageService.update(id, updatePackageDto);
  }

  @ApiOperation({ summary: 'Delete multiple packages' })
  @Delete('bulk')
  removeBulk(@Body() ids: number[]): Promise<void> {
    return this.packageService.removeBulk(ids);
  }

  @ApiOperation({ summary: 'Delete a package by ID' })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.packageService.remove(id);
  }
}
