import { FastifyRequest, FastifyReply } from 'fastify';
import AuthService from '@modules/services/AuthService';

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return reply.code(401).send({ isError: true, message: 'Token no proporcionado' });
    }

    try {
        const decoded = AuthService.verificarToken(token);
        request.user = decoded;
        console.log(request.user);
    } catch (error) {
        return reply.code(403).send({ isError: true, message: 'Token inválido' });
    }

    return reply.code(200).send({ isError: false, message: 'Token válido' });
};

export default authMiddleware;
