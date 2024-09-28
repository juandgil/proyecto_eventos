import { UsuariosRepository } from '@modules/Usuarioas/domain/repositories/UsuariosRepository';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import TYPESDEPENDENCIES from '@modules/Usuarioas/dependencies/TypesDependencies';
import Usuario from '@modules/Usuarioas/domain/entities/Usuarios';
import BadMessageException from '@common/http/exceptions/BadMessageException';
import { PerfilesRepository } from '@modules/Perfiles/domain/repositories/PerfilesRepository';
import { generarClaveAleatoria } from '@common/util/Funciones';
import { IGuardarUsuariosFIn } from '../dto/in';
import NotificacionUsuarioCreado from '../../domain/entities/NotificacionUsuarioCreado';

export default class CrearUsuariosUseCase {
    private usuariosRepository = DEPENDENCY_CONTAINER.get<UsuariosRepository>(TYPESDEPENDENCIES.UsuariosRepository);

    private perfilesRepository = DEPENDENCY_CONTAINER.get<PerfilesRepository>(TYPESDEPENDENCIES.PerfilesRepository);

    async execute(data: IGuardarUsuariosFIn, codigoCliente: string | undefined): Promise<string> {
        if (!codigoCliente) {
            throw new BadMessageException('Código cliente no existe', 'El código cliente no se encuentra registrado');
        }
        const consultarUsuario = await this.usuariosRepository.consultarUsuarioPorCorreos(data.correo);
        if (consultarUsuario) {
            throw new BadMessageException('Correo existe', 'El correo del usuario ya fue creado');
        }

        if (data?.id_perfil !== null) {
            const perfil = await this.perfilesRepository.consultarPorId(data?.id_perfil as number);
            if (!perfil) {
                throw new BadMessageException('Perfil no existe', 'El perfil no se encuentra registrado');
            }
        }

        const objUsuario: Usuario = {
            correo: data.correo,
            activo: true,
            sincronizacionSuite: false,
            estadoSincronizacion: 'pendiente_sincronizacion',
            idPerfil: data.id_perfil,
        };

        const usuario = await this.usuariosRepository.guardar(objUsuario);
        const claveAleatoria = generarClaveAleatoria();
        if (usuario) {
            const stageUsuario: NotificacionUsuarioCreado = {
                id_usuario: usuario.idUsuario,
                parametros: {
                    codigo_cliente: parseInt(codigoCliente, 10),
                    contrasena: claveAleatoria,
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    tipo_identificacion: data.tipo_identificacion,
                    identificacion: data.identificacion,
                    telefono: data.telefono,
                    correo: data.correo,
                },
                codigo_cliente: parseInt(codigoCliente, 10),
                estado: 'pendiente',
                reintentos: 0,
            };
        }
        return 'El usuario se guardo correctamente';
    }
}
