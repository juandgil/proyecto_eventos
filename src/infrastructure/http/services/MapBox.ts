import BadMessageException from '@common/http/exceptions/BadMessageException';
import ENV from '@common/envs/Envs';
import axios from 'axios';

export class MapBox {
    private accessToken: string;

    constructor() {
        this.accessToken = ENV.MAPBOX_ACCESS_TOKEN;
        if (!this.accessToken) {
            throw new Error('MAPBOX_ACCESS_TOKEN no está definido en las variables de entorno');
        }
    }

    async obtenerCoordenadas(address: string): Promise<[number, number]> {
        const { data } = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`,
            {
                params: { access_token: this.accessToken },
            },
        );

        if (!data.features || data.features.length === 0) {
            throw new BadMessageException(
                'No se encontraron resultados para la dirección proporcionada',
                'Dirección no encontrada',
            );
        }

        return data.features[0].center;
    }

    async buscarLugaresCercanos(coordinates: [number, number], radius = 1000): Promise<any[]> {
        const { data } = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json`,
            {
                params: {
                    radius,
                    access_token: this.accessToken,
                },
            },
        );

        if (!data.features) {
            throw new BadMessageException(
                'Error al buscar lugares cercanos',
                'No se pudieron obtener las ubicaciones cercanas',
            );
        }

        return data.features.map((feature: any) => ({
            name: feature.text,
            address: feature.place_name,
            coordinates: feature.center,
        }));
    }

    async obtenerUbicacionesCercanas(address: string): Promise<any[]> {
        const coordinates = await this.obtenerCoordenadas(address);
        return this.buscarLugaresCercanos(coordinates);
    }
}

export default new MapBox();
