import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller.js';
import { LeadsService } from './leads.service.js';
import { DatabaseService } from '../database/database.service.js';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, DatabaseService],
})
export class LeadsModule {}
