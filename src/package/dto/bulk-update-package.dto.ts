import { UpdatePackageDto } from './update-package.dto';
import { IsArray, IsNumber } from 'class-validator';

class UpdatePackageWithIdDto extends UpdatePackageDto {
  @IsNumber()
  id: number;
}

export class BulkUpdatePackageDto {
  @IsArray()
  packages: UpdatePackageWithIdDto[];
}
