import { PickType } from '@nestjs/swagger';
import { PersonDto } from './person.dto';

export class GetHistoryOfPersonDto extends PickType(PersonDto, [
  'personId',
]) {
}
