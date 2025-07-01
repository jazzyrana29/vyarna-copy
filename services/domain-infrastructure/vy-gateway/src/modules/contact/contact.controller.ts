// src/contact/contact.controller.ts
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { ResponseDTO } from '../../dto/response.dto';
import { CreateContactDto } from './dto/create-contact.dto';
import { ValidateCreateContactDtoPipe } from './pipes/validate-create-contact-dto.pipe';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('create-contact')
  @ApiCreatedResponse({ type: ResponseDTO<any> })
  @ApiBody({ type: CreateContactDto })
  async createBusinessUnitEntity(
    @Body(new ValidateCreateContactDtoPipe())
    createBusinessUnitDto: CreateContactDto,
  ): Promise<ResponseDTO<any>> {
    return new ResponseDTO(
      HttpStatus.OK,
      await this.contactService.createContact(createBusinessUnitDto),
      'A contact has been successfully created',
    );
  }
}
