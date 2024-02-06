import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from './models/producer';
import { ProducerService } from './service/producer.service';
import { ProducerController } from './controller/producer.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Producer]),
    ],
    controllers: [ProducerController],
    providers: [ProducerService],
})
export class RuralProducerModule {}
