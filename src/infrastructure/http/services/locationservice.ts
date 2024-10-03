import mapboxSdk from '@mapbox/mapbox-sdk';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import ENV from '@common/envs/Envs';

const mapboxToken = ENV.MAPBOX_ACCESS_TOKEN;
if (!mapboxToken) {
    throw new Error('MAPBOX_ACCESS_TOKEN no está definido en las variables de entorno');
}

const mapboxClient = mapboxSdk({ accessToken: mapboxToken });
const geocodeService = mapboxClient.geocoding;

export default async function obtenerLocalizacionesCercanas(address: string): Promise<any> {
    try {
        // Primero, obtenemos las coordenadas de la dirección proporcionada
        const geoResponse = await geocodeService
            .forwardGeocode({
                query: address,
                limit: 1,
            })
            .send();

        if (geoResponse.body.features.length === 0) {
            throw new BadMessageException(
                'No se encontraron resultados para la dirección proporcionada',
                'Dirección no encontrada',
            );
        }

        const [lng, lat] = geoResponse.body.features[0].center;

        // Luego, buscamos lugares cercanos usando las coordenadas obtenidas
        const nearbyResponse = await geocodeService
            .reverseGeocode({
                query: [lng, lat],
                limit: 10,
                types: ['poi'],
                radius: 1000, // 1 km en metros
            })
            .send();

        return nearbyResponse.body.features.map((feature: any) => ({
            name: feature.text,
            address: feature.place_name,
            coordinates: feature.center,
        }));
    } catch (error) {
        if (error instanceof BadMessageException) {
            throw error;
        } else {
            throw new BadMessageException(
                'Error en el servicio de geolocalización',
                'No se pudieron obtener las ubicaciones cercanas',
            );
        }
    }
}
