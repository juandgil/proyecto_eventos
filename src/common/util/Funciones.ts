export const generarClaveAleatoria = (): string => {
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const simbolos = '!@$%^&*()_+';
    const todosLosCaracteres = mayusculas + minusculas + numeros + simbolos;
    let clave = '';

    // Asegurar que haya al menos una mayúscula, una minúscula y un número
    clave += mayusculas.charAt(Math.floor(Math.random() * mayusculas.length));
    clave += minusculas.charAt(Math.floor(Math.random() * minusculas.length));
    clave += numeros.charAt(Math.floor(Math.random() * numeros.length));
    for (let i = 3; i < 8; i += 1) {
        clave += todosLosCaracteres.charAt(Math.floor(Math.random() * todosLosCaracteres.length));
    }
    clave = clave
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
    return clave;
};

export const sleep = (seconds: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(() => resolve(), seconds * 1000);
    });

export const generarToken = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};
