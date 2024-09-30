import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ENV from '@common/envs/Envs';

const SECRET_KEY = ENV.JWT_SECRET;

export default class AuthService {
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    static async compararContrasenas(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    static generarToken(userId: string): string {
        return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
    }

    static verificarToken(token: string): any {
        return jwt.verify(token, SECRET_KEY);
    }
}
