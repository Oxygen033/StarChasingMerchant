import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class CreateCharacterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    race: string;

    @IsString()
    @IsNotEmpty()
    class: string;

    @IsString()
    @IsNotEmpty()
    age: number;
}
