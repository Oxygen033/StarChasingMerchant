import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  character: number;
}
