import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ENV from '@common/envs/Envs';
import { IAuthService } from './IAuthService';

const SECRET_KEY = ENV.JWT_SECRET;

@injectable()
export default class AuthService implements IAuthService {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async compararContrasenas(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    generarToken(userId: string): string {
        return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
    }

    verificarToken(token: string): any {
        return jwt.verify(token, SECRET_KEY);
    }
}
