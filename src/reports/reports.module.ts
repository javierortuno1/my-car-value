import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  // Connection to SQLite DB AppModule Should exist.
  // Define the Reporsitory to TypeORM by sharing the entity
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
