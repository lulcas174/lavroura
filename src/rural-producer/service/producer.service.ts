import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from "../models/producer";
import { Repository } from "typeorm";
import { IProducer, IProducerListResponse, IProducerResponse } from "../interface/producer.interface";

@Injectable()
export class ProducerService {
    constructor(
        @InjectRepository(Producer)
        private readonly producerRepository: Repository<Producer>,
    ) { }

    async create(reqBody: IProducer): Promise<IProducerResponse> {
        let objectReturn: IProducerResponse;
        try {
            const newProducer = this.producerRepository.create(reqBody);
            const savedProducer = await this.producerRepository.save(newProducer);

            objectReturn = {
                'Producer': savedProducer,
                'message': 'Producer created successfully',
                'status': 'success'
            };

            return objectReturn;
        } catch (error) {
            objectReturn = {
                'message': error.message,
                'status': 'error'
            };

            return objectReturn;
        }
    }

    async list(): Promise<IProducerListResponse> {
        let objectReturn: IProducerListResponse;
        try {
            const producers = await this.producerRepository.find();
            objectReturn = {
                'Producers': producers,
                'message': 'Producers listed successfully',
                'status': 'success'
            };

            return objectReturn;
        } catch (error) {
            objectReturn = {
                'message': error.message,
                'status': 'error'
            };

            return objectReturn;
        }
    }

    async getProducerById(id): Promise<IProducerResponse> {
        let objectReturn: IProducerResponse;
        try {
            const producer = await this.producerRepository.findOne({
                where: { id: id }
            });
            if (!producer) {
                throw new Error('Producer not found');
            }
            objectReturn = {
                'Producer': producer,
                'message': 'Producer found successfully',
                'status': 'success'
            };

            return objectReturn;
        } catch (error) {
            objectReturn = {
                'message': error.message,
                'status': 'error'
            };

            return objectReturn;
        }
    }

    async updateProducer(id, reqBody: IProducer): Promise<IProducerResponse> {
        let objectReturn: IProducerResponse;
        try {
            const producer = await this.producerRepository.findOne({ where: { id: id } });
            if (!producer) {
                throw new Error('Producer not found');
            }
            
            const updateFields = Object.keys(reqBody).filter((field) => producer.hasOwnProperty(field));
            if(updateFields.length === 0) {
                throw new Error('No fields to update');
            }
            updateFields.forEach((field) => {
                producer[field] = reqBody[field];
            });

            const updatedProducer = await this.producerRepository.save(producer);

            objectReturn = {
                'Producer': updatedProducer,
                'message': 'Producer updated successfully',
                'status': 'success'
            };
    
            return objectReturn;
        } catch (error) {
            objectReturn = {
                'message': error.message,
                'status': 'error'
            };
    
            return objectReturn;
        }
    }
}