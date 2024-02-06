import { Controller, Get, Post, Body } from '@nestjs/common';
import { Producer } from '../models/producer';
import { ProducerService } from '../service/producer.service';

@Controller('producer')
export class ProducerController {
    constructor(private readonly producerService: ProducerService){
    }
    
    @Post('create')
    async create(@Body() producer: any): Promise<any>{
        return this.producerService.create(producer);
    }
}