import {
  Controller,
  Post,
  Body,
  UsePipes,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { LeadsService } from './leads.service.js';
import { CreateLeadSchema } from './dto/create-lead.dto.js';
import type { CreateLeadDto } from './dto/create-lead.dto.js';

class ZodValidationPipe implements PipeTransform {
  constructor(private schema: any) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const firstError =
        result.error.errors[0]?.message || 'Ошибка валидации данных';
      throw new BadRequestException(firstError);
    }
    return result.data;
  }
}

@Controller('api/lead')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateLeadSchema))
  async create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.createLead(createLeadDto);
  }
}
