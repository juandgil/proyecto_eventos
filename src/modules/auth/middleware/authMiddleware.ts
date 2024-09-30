import { FastifyRequest, FastifyReply } from 'fastify';
import AuthService from '@modules/services/AuthService';

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        reply.code(401).send({ isError: true, message: 'Token no proporcionado' });
        return;
    }

    try {
        const decoded = AuthService.verificarToken(token);
        request.user = decoded;
    } catch (error) {
        reply.code(403).send({ isError: true, message: 'Token inválido' });
    }
};

export default authMiddleware;
