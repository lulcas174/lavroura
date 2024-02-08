export interface IFarmListResponse {
    quantity?: number;
    message: string;
    status: string;
}

export interface IFarmCultureResponse {
  quantity?: number;
  message: string;
  status: string;
  mostPlantedCulture?: string;
  leastPlantedCulture?: string;
}
  