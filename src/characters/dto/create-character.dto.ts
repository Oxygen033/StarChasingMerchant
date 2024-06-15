import { IsEnum, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';
import { Race } from '../enums/races.enum';
import { CharacterSpecClass } from '../enums/classes.enum';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Race)
  @IsNotEmpty()
  race: Race;

  @IsString()
  @IsNotEmpty()
  sex: string;

  @IsEnum(CharacterSpecClass)
  @IsNotEmpty()
  class: CharacterSpecClass;

  @IsString()
  @IsNotEmpty()
  age: number;
}
