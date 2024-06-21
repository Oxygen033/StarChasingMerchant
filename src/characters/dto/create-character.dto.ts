import { IsEnum, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';
import { Race } from '../enums/races.enum';
import { CharacterSpecClass } from '../enums/classes.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEnum(Race)
  @IsNotEmpty()
  race: Race;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sex: string;

  @ApiProperty()
  @IsEnum(CharacterSpecClass)
  @IsNotEmpty()
  class: CharacterSpecClass;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  age: number;
}
