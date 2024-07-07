import { IsInt, Min, Max } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(0)
  offset: number;

  @IsInt()
  @Min(1)
  @Max(500)
  limit: number;
}
