import { FastifyRequest, FastifyReply } from 'fastify';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import TYPESDEPENDENCIES from '@modules/Usuarios/dependencies/TypesDependencies';
import { IAuthService } from '@modules/services/IAuthService';

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        reply.code(401).send({ isError: true, message: 'Token no proporcionado' });
        return;
    }

    try {
        const authService = DEPENDENCY_CONTAINER.get<IAuthService>(TYPESDEPENDENCIES.AuthService);
        const decoded = authService.verificarToken(token);
        request.user = decoded;
    } catch (error) {
        reply.code(403).send({ isError: true, message: 'Token inválido' });
    }
};

export default authMiddleware;
