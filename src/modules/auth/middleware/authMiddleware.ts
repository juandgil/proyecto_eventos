import { FastifyRequest, FastifyReply } from 'fastify';
import AuthService from '@modules/services/AuthService';

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return reply.code(401).send({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = AuthService.verificarToken(token);
        request.user = decoded;
    } catch (error) {
        return reply.code(403).send({ message: 'Token inválido' });
    }

    return reply.code(200).send({ message: 'Token válido' });
};

export default authMiddleware;
