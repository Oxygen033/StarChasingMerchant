import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  character: number;
}
