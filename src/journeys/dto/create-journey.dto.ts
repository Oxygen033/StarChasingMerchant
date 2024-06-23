import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJourneyDto {
    @IsNotEmpty()
    @IsNumber()
    characterId: number;

    @IsNotEmpty()
    @IsString()
    startPoint: string;

    @IsNotEmpty()
    @IsString()
    endPoint: string;
}
