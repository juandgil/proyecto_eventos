export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    compararContrasenas(password: string, hash: string): Promise<boolean>;
    generarToken(userId: string): string;
    verificarToken(token: string): any;
}
