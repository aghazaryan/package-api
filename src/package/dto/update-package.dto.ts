import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePackageDto {
  @ApiProperty({ description: 'Color of the package' })
  @IsString()
  color?: string;

  @ApiProperty({ description: 'Name of the package' })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Length of the package' })
  @IsNumber()
  length?: number;

  @ApiProperty({ description: 'Width of the package' })
  @IsNumber()
  width?: number;

  @ApiProperty({ description: 'Height of the package' })
  @IsNumber()
  height?: number;

  @ApiProperty({ description: 'Weight of the package' })
  @IsNumber()
  weight?: number;

  @ApiProperty({ description: 'Quantity of the package' })
  @IsNumber()
  quantity?: number;

  @ApiProperty({ description: 'Is the package stackable?' })
  @IsBoolean()
  stackable?: boolean;

  @ApiProperty({ description: 'Is the package tiltable?' })
  @IsBoolean()
  tiltable?: boolean;
}
