import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave más segura

export default class AuthService {
    static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    static compararContrasenas(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    static generarToken(userId: string): string {
        return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
    }

    static verificarToken(token: string): any {
        return jwt.verify(token, SECRET_KEY);
    }
}
