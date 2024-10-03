import { injectable, inject } from 'inversify';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { AxiosRepository } from '@common/http/repositories/AxiosRepository';
import { IObtenerUbicacionesCercanasIn } from '../dto/in/IUbicacionesIn';
import { IObtenerUbicacionesCercanasOut } from '../dto/out/IUbicacionesOut';
import TYPESDEPENDENCIES from '../../dependencies/TypesDependencies';

@injectable()
export default class ObtenerUbicacionesCercanasUseCase {
    constructor(@inject(TYPESDEPENDENCIES.ApiServiceAxios) private apiService: AxiosRepository) {}

    async execute(data: IObtenerUbicacionesCercanasIn): Promise<IObtenerUbicacionesCercanasOut> {
        if (!data.direccion) {
            throw new BadMessageException('Dirección no proporcionada', 'Se requiere una dirección');
        }

        try {
            console.log('Obteniendo coordenadas para:', data.direccion);
            const coordenadas = await this.obtenerCoordenadas(data.direccion);
            console.log('Coordenadas obtenidas:', coordenadas);

            console.log('Buscando lugares cercanos');
            const ubicacionesCercanas = await this.buscarLugaresCercanos(coordenadas);
            console.log('Ubicaciones cercanas encontradas:', ubicacionesCercanas.length);

            return {
                ubicaciones: ubicacionesCercanas,
            };
        } catch (error) {
            console.error('Error detallado:', error);
            throw new BadMessageException(
                'Error en el servicio de ubicaciones',
                'Error inesperado al obtener ubicaciones cercanas',
            );
        }
    }

    private async obtenerCoordenadas(direccion: string): Promise<[number, number]> {
        const response = await this.apiService.obtenerCoordenadas(direccion);
        console.log('Respuesta de Mapbox:', {
            status: response.status,
            statusText: response.statusText,
            data: response.data,
        });
        const { data } = response;

        if (!data || !data.features || data.features.length === 0) {
            throw new BadMessageException(
                'No se encontraron resultados para la dirección proporcionada',
                'Dirección no encontrada',
            );
        }

        return data.features[0].center;
    }

    private async buscarLugaresCercanos(coordenadas: [number, number], radio = 1000): Promise<any[]> {
        const response = await this.apiService.buscarLugaresCercanos(coordenadas, radio);
        const { data } = response;

        if (!data || !data.features) {
            throw new BadMessageException(
                'Error al buscar lugares cercanos',
                'No se pudieron obtener las ubicaciones cercanas',
            );
        }

        return data.features.map((feature: any) => ({
            nombre: feature.text,
            direccion: feature.place_name,
            coordenadas: feature.center,
        }));
    }
}
