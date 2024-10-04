const ProcesarExcelSchema = {
    subirArchivo: {
        description: 'Subir archivo Excel',
        tags: ['ProcesarExcel'],
        summary: 'Subir archivo Excel para procesamiento',
        consumes: ['multipart/form-data'],
        body: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
            required: ['file'],
        },
        response: {
            200: {
                description: 'Archivo subido exitosamente',
                type: 'object',
                properties: {
                    ok: { type: 'string' },
                    data: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
    consultarEstado: {
        description: 'Consultar estado de procesamiento',
        tags: ['ProcesarExcel'],
        summary: 'Consultar estado de procesamiento de archivo Excel',
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' },
            },
            required: ['id'],
        },
        response: {
            200: {
                description: 'Estado consultado exitosamente',
                type: 'object',
                properties: {
                    ok: { type: 'string' },
                    data: {
                        type: 'object',
                        properties: {
                            estado: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
};

export default ProcesarExcelSchema;
