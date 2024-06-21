import { PartialType } from '@nestjs/mapped-types';
import { CreateJorneyDto } from './create-jorney.dto';

export class UpdateJorneyDto extends PartialType(CreateJorneyDto) {
  id: number;
}
