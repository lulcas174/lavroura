import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './controller/dashboard.controller';
import { ProducerController } from './controller/producer.controller';
import { Producer } from './models/producer';
import { DashboardService } from './service/dashboard.service';
import { ProducerService } from './service/producer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Producer]),
    ],
    providers: [
        ProducerService,
        DashboardService
    ],
    controllers: [
        DashboardController,
        ProducerController
    ],
})
export class RuralProducerModule {}
