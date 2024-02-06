import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from "../models/producer";
import { Repository } from "typeorm";

@Injectable()
export class ProducerService {
    constructor(
        @InjectRepository(Producer)
        private readonly producerRepository: Repository<Producer>,
    ){}
    
    async create(producer: any): Promise<any>{
        const produ = this.producerRepository.create(producer);
        return this.producerRepository.save(produ);
    }
}