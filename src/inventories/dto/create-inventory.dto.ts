import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsOptional()
  relatedItem: string;
}
