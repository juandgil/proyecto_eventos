import { z } from 'zod';

export const ISubirArchivoSchema = z.object({
    archivo: z.instanceof(Buffer),
});

export const IConsultarEstadoSchema = z.object({
    id: z.string(),
});
