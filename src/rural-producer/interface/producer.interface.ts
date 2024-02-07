import { CropsPlantedEnum } from "src/rural-producer/models/producer";

export interface IProducer {
    id: number;
    CPF: string;
    CNPJ: string;
    nameProducer: string;
    nameFarm: string;
    city: string;
    state: string;
    areaTotalHectares: number;
    areaAgriculturalHectares: number;
    areaVegetationHectares: number;
    culturasPlantadas?: CropsPlantedEnum[];
}

export interface IProducerResponse {
  Producer?: IProducer;
  message: string;
  status: string;
}

export interface IProducerListResponse {
  Producers?: IProducer[];
  message: string;
  status: string;
}