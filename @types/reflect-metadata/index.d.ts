declare module '@mapbox/mapbox-sdk';
declare module '@mapbox/mapbox-sdk/services/geocoding';
declare module 'fastify-multipart' {
    import { FastifyPlugin } from 'fastify';

    export interface MultipartFile {
        toBuffer: () => Promise<Buffer>;
        file: NodeJS.ReadableStream;
        fieldname: string;
        filename: string;
        encoding: string;
        mimetype: string;
        fields: { [key: string]: string | string[] };
    }

    interface FastifyMultipartOptions {
        limits?: {
            fieldNameSize?: number;
            fieldSize?: number;
            fields?: number;
            fileSize?: number;
            files?: number;
            parts?: number;
            headerPairs?: number;
        };
        addToBody?: boolean;
        sharedSchemaId?: string;
        onFile?: (part: MultipartFile) => void;
    }

    const fastifyMultipart: FastifyPlugin<FastifyMultipartOptions>;

    export default fastifyMultipart;
}
