import { BadRequestException } from '@nestjs/common';
import { ValidateCreatePersonDtoPipe } from './validate-create-person-dto.pipe';
import { CreatePersonDto } from 'ez-utils';

describe('ValidateCreatePersonDtoPipe', () => {
  const pipe = new ValidateCreatePersonDtoPipe();
  const baseDto: CreatePersonDto = {
    rootBusinessUnitId: 'uuid',
    nameFirst: 'John',
    nameLastFirst: 'Doe',
    email: 'john@example.com',
    password: 'secret',
  } as any;

  test('passes with required fields', () => {
    expect(pipe.transform({ ...baseDto }, {} as any)).toEqual(baseDto);
  });

  test('allows missing optional nameLastSecond', () => {
    const dto = { ...baseDto };
    expect(pipe.transform(dto, {} as any)).toEqual(dto);
  });

  const required = [
    'rootBusinessUnitId',
    'nameFirst',
    'nameLastFirst',
    'email',
    'password',
  ] as const;

  for (const field of required) {
    test(`throws when ${field} missing`, () => {
      const dto: any = { ...baseDto };
      delete dto[field];
      expect(() => pipe.transform(dto, {} as any)).toThrow(BadRequestException);
    });
  }
});
