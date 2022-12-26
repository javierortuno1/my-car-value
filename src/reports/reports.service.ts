import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { GetEstimateDto } from './dtos/get-estimate.dto';


@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    // Creating the Entity instance
    const report = this.repo.create(reportDto);
    // Update the instnace
    report.user = user;

    // save the entity instance. Here the 'repository' will only extract the userID from 'user'
    return this.repo.save(report)
  }

  async changeApproval(id: string, approved: boolean) {
    // found the report
    const report = await this.repo.findOne({
      where: { id: parseInt(id) }
    });
    if (!report) {
      throw new NotFoundException('report not found');
    }

    // Update the property
    report.approved = approved;

    // Save the updated entity
    return this.repo.save(report);
  }

  // createEstimate(estimateDto: GetEstimateDto) {
    // Destructuring the object in form of a make, model
  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo.createQueryBuilder()
      .select('AVG(price)', 'price')
      // .where('make = :make', { make: estimateDto.make })
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere(' lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere(' lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere(' year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      // OrderBy does not take a parameter as a second argument
      .orderBy('mileage - :mileage', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
