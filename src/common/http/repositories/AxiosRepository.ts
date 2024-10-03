import { AxiosResponse } from 'axios';

export interface AxiosRepository {
    getDataFromUrl(url: string): Promise<AxiosResponse>;
    postDataToUrl(url: string, _data: unknown): Promise<AxiosResponse>;
    obtenerCoordenadas(address: string): Promise<AxiosResponse>;
    buscarLugaresCercanos(coordinates: [number, number], radius: number): Promise<AxiosResponse>;
}
