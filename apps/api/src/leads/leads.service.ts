import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { randomUUID } from 'crypto';

@Injectable()
export class LeadsService {
  private lastRequestMap = new Map<string, number>();

  constructor(private readonly dbService: DatabaseService) {}

  async createLead(dto: CreateLeadDto) {
    const now = Date.now();
    const tenMinutesMs = 10 * 60 * 1000;
    const lastTime = this.lastRequestMap.get(dto.phone);

    if (lastTime && now - lastTime < tenMinutesMs) {
      throw new HttpException(
        'Вы уже оставили заявку. Наш менеджер перезвонит вам в ближайшее время!',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const id = randomUUID();
    const stmt = this.dbService.db.prepare(`
      INSERT INTO leads (id, name, phone, type, comment, utm_source, utm_medium, utm_campaign, utm_content, utm_term)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      dto.name,
      dto.phone,
      dto.type,
      dto.comment || null,
      dto.utm?.source || null,
      dto.utm?.medium || null,
      dto.utm?.campaign || null,
      dto.utm?.content || null,
      dto.utm?.term || null,
    );

    this.lastRequestMap.set(dto.phone, now);

    return {
      success: true,
      message: 'Заявка успешно принята! Менеджер свяжется с вами.',
    };
  }
}
