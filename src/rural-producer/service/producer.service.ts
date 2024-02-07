import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from "../models/producer";
import { Repository } from "typeorm";
import { IProducer, IProducerListResponse, IProducerResponse } from "../interface/producer.interface";
import { validateAreaTotalValues } from "../validators/area.validators";


@Injectable()
export class ProducerService {
    constructor(
        @InjectRepository(Producer)
        private readonly producerRepository: Repository<Producer>,
    ) { }

    async create(reqBody: IProducer): Promise<IProducerResponse> {
        let objectReturn: IProducerResponse;
        try {
            const producerExists = await this.producerRepository.findOne({
                where: [
                    { CPF: reqBody.CPF },
                    { CNPJ: reqBody.CNPJ }
                ]
            });
            if (producerExists) {
                throw new Error('Producer already exists');
            }
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
            if (reqBody && (reqBody.areaAgriculturalHectares || reqBody.areaTotalHectares || reqBody.areaVegetationHectares)) {
                if (typeof reqBody.areaTotalHectares === 'string' || typeof reqBody.areaAgriculturalHectares === 'string' || typeof reqBody.areaVegetationHectares === 'string') {
                    throw new Error('Invalid input: parameters must be numbers');
                }
                let areaTotalHectares = reqBody.areaTotalHectares !== undefined ? reqBody.areaTotalHectares : (producer && producer.areaTotalHectares);
                let areaAgriculturalHectares = reqBody.areaAgriculturalHectares !== undefined ? reqBody.areaAgriculturalHectares : (producer && producer.areaAgriculturalHectares);
                let areaVegetationHectares = reqBody.areaVegetationHectares !== undefined ? reqBody.areaVegetationHectares : (producer && producer.areaVegetationHectares);
                const areaValidationResult = validateAreaTotalValues(areaTotalHectares, areaAgriculturalHectares, areaVegetationHectares);
                if (areaValidationResult) {
                    throw new Error(areaValidationResult);
                }
            }
            const updateFields = Object.keys(reqBody).filter((field) => producer.hasOwnProperty(field));
            if (updateFields.length === 0) {
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

    async deleteProducer(id): Promise<IProducerResponse> {
        let objectReturn: IProducerResponse;
        try {
            const producer = await this.producerRepository.findOne({ where: { id: id } });
            if (!producer) {
                throw new Error('Producer not found');
            }
            await this.producerRepository.remove(producer);
            objectReturn = {
                'message': 'Producer deleted successfully',
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