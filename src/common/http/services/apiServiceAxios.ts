import { injectable } from 'inversify';
import axios, { AxiosResponse } from 'axios';
import ENV from '@common/envs/Envs';
import { AxiosRepository } from '../repositories/AxiosRepository';

@injectable()
export default class ApiServiceAxios implements AxiosRepository {
    private accessToken: string;

    constructor() {
        this.accessToken = ENV.MAPBOX_ACCESS_TOKEN;
        if (!this.accessToken) {
            throw new Error('MAPBOX_ACCESS_TOKEN no está definido en las variables de entorno');
        }
    }

    async getDataFromUrl(url: string): Promise<AxiosResponse> {
        const response = await axios.get(url);
        return response;
    }

    async postDataToUrl(url: string, data: unknown): Promise<AxiosResponse> {
        const response = await axios.post(url, data);
        return response;
    }

    async obtenerCoordenadas(address: string): Promise<AxiosResponse> {
        const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`,
            {
                params: { access_token: this.accessToken },
            },
        );
        return response; // Devuelve la respuesta completa de axios
    }

    async buscarLugaresCercanos(coordinates: [number, number], radius = 1000): Promise<AxiosResponse> {
        const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json`,
            {
                params: {
                    radius,
                    access_token: this.accessToken,
                },
            },
        );
        return response; // Devuelve la respuesta completa de axios
    }
}
