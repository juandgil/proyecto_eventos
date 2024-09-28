import { UsuariosRepository } from '@modules/Usuarioas/domain/repositories/UsuariosRepository';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import TYPESDEPENDENCIES from '@modules/Usuarioas/dependencies/TypesDependencies';
import TYPESDEPENDENCIESGLOBAL from '@common/dependencies/TypesDependencies';
import { ClientesRepository } from '@modules/Usuarioas/domain/repositories/ClientesRepository';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import Usuarios from '@modules/Usuarioas/domain/entities/Usuarios';
import ConflictMessageException from '@common/http/exceptions/ConflictMessageException';
import { ICrearUsuariosSuiteIn } from '../dto/in/ICrearUsuariosSuiteIn';

export default class CrearUsuariosSuiteUseCase {
    private usuariosRepository = DEPENDENCY_CONTAINER.get<UsuariosRepository>(TYPESDEPENDENCIES.UsuariosRepository);

    private clientesRepository = DEPENDENCY_CONTAINER.get<ClientesRepository>(TYPESDEPENDENCIES.ClientesRepository);

    private perfilesRepository = DEPENDENCY_CONTAINER.get<PerfilesRepository>(TYPESDEPENDENCIES.PerfilesRepository);

    async execute(data: ICrearUsuariosSuiteIn): Promise<Usuarios> {
        const cliente = await this.clientesRepository.consultarPorCodigoClienteSuite(data.codigo_cliente_suite);
        if (!cliente) {
            throw new BadMessageException('Cliente no existe', 'El código cliente suite no se encuentra registrado');
        }

        DEPENDENCY_CONTAINER.rebind<string>(TYPESDEPENDENCIESGLOBAL.TenantID).toConstantValue(cliente.nombreUrl);

        const usuario = await this.usuariosRepository.consultarUsuarioPorCorreos(data.correo_usuario);

        if (usuario) {
            throw new ConflictMessageException('Usuario existe', 'El usuario ya se encuentra registrado');
        }

        const perfil = await this.perfilesRepository.consultarMaestro();

        if (!perfil) {
            throw new BadMessageException('Perfil no existe', 'El perfil maestro no se encuentra registrado');
        }

        const crearUsuario: Usuarios = {
            correo: data.correo_usuario,
            activo: true,
            sincronizacionSuite: true,
            estadoSincronizacion: 'usuario_suite_creado',
            idPerfil: perfil.idPerfil,
        };

        const obtenerUsuario = await this.usuariosRepository.guardar(crearUsuario);

        return obtenerUsuario;
    }
}
