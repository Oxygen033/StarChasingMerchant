import { PartialType } from '@nestjs/mapped-types';
import { CreateJourneyDto } from './create-journey.dto';

export class UpdateJourneyDto extends PartialType(CreateJourneyDto) {
  id: number;
}
