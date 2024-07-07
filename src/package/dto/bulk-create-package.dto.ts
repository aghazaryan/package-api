import { CreatePackageDto } from './create-package.dto';
import { IsArray } from 'class-validator';

export class BulkCreatePackageDto {
  @IsArray()
  packages: CreatePackageDto[];
}
