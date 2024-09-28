export const decode = (buffer: string): string => {
    return Buffer.from(buffer, 'base64').toString();
};

export const encode = <T>(data?: T): Buffer => {
    const buffer = JSON.stringify(data);
    return Buffer.from(buffer);
};

export const validarJSON = (requestData: string): object => {
    try {
        return JSON.parse(requestData);
    } catch (e) {
        const stack = {
            typeResponse: 'error',
            httpCode: 400,
            message: 'El formato JSON enviado es incorrecto',
            JSON: requestData,
        };
        throw new TypeError(JSON.stringify(stack));
    }
};

export const decodeMessageData = (data: string): object => {
    return validarJSON(Buffer.from(data, 'base64').toString());
};
