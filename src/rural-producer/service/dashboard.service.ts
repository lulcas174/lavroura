import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { IFarmCultureResponse, IFarmListResponse } from "../interface/farm.interface";
import { Producer } from "../models/producer";


@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Producer)
        private readonly producerRepository: Repository<Producer>,
    ) { }

    async listFarms(): Promise<IFarmListResponse> {
        const producers = await this.producerRepository.find();

        if (producers.length === 0) {
            return {
                message: 'No farms found.',
                status: 'error'
            };
        }

        const farms = producers.map(producer => producer.nameFarm);

        return {
            quantity: farms.length,
            message: 'Farms found.',
            status: 'success'
        };
    }

    async listFarmHectares(): Promise<IFarmListResponse> {
        const producers = await this.producerRepository.find();

        if (producers.length === 0) {
            return {
                message: 'No producers found.',
                status: 'error'
            };
        }

        const totalHectares = producers.reduce((total, producer) => total + Number(producer.areaTotalHectares), 0);

        return {
            quantity: totalHectares,
            message: 'Total hectares found.',
            status: 'success'
        };
    }

    async totalStates(state?: string): Promise<IFarmListResponse> {
        let producers;
        if (state) {
            producers = await this.producerRepository.find(
                {
                    where: {
                        state
                    }
                }
            );
        } else {
            producers = await this.producerRepository.find();
        }

        if (producers.length === 0) {
            return {
                quantity: 0,
                message: 'No producers in this state.',
                status: 'empty'
            };
        }

        const states = producers.map(producer => producer.state);

        return {
            quantity: states.length,
            message: 'States found.',
            status: 'success'
        };
    }

    async totalCultures(): Promise<IFarmCultureResponse> {
        const producers = await this.producerRepository.find();
    
        if (producers.length === 0) {
            return {
                message: 'No producers found.',
                status: 'error'
            };
        }
    
        const cultures = producers.map(producer => producer.culturasPlantadas);
    
        const cultureCountMap = new Map<string, number>();
        cultures.forEach(cultureList => {
            cultureList.forEach(culture => {
                cultureCountMap.set(culture, (cultureCountMap.get(culture) || 0) + 1);
            });
        });
    
        const totalCultures = cultureCountMap.size;
    
        let mostPlantedCulture: string | undefined;
        let mostPlantedCount = 0;
        cultureCountMap.forEach((count, culture) => {
            if (count > mostPlantedCount) {
                mostPlantedCount = count;
                mostPlantedCulture = culture;
            }
        });
    
        let leastPlantedCulture: string | undefined;
        let leastPlantedCount = Number.MAX_SAFE_INTEGER;
        cultureCountMap.forEach((count, culture) => {
            if (count < leastPlantedCount) {
                leastPlantedCount = count;
                leastPlantedCulture = culture;
            }
        });
    
        return {
            quantity: totalCultures,
            message: 'Cultures found.',
            status: 'success',
            mostPlantedCulture,
            leastPlantedCulture
        };
    }

    async useSoloHectares(): Promise<IFarmListResponse> {
        const producers = await this.producerRepository.find();

        if (producers.length === 0) {
            return {
                message: 'No producers found.',
                status: 'error'
            };
        }

        const soloUsed = producers.reduce((total, producer) => total + Number(producer.areaVegetationHectares) + Number(producer.areaAgriculturalHectares), 0);

        return {
            quantity: soloUsed,
            message: 'Total hectares found.',
            status: 'success'
        };
    }
}