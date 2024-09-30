import { IModule } from '@common/modules/IModule';
import { HTTPMETODO, Ruta } from '@common/modules/Ruta';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
import authMiddleware from '@modules/auth/middleware/authMiddleware';
import TYPESDEPENDENCIES from './dependencies/TypesDependencies';
import createDependencies from './dependencies/Dependencies';
import UsuariosController from './controllers/UsuariosController';
import UsuariosShema from './schemas/UsuariosShema';

export default class UsuariosModules implements IModule {
    private moduloRuta = '/';

    constructor() {
        createDependencies();
    }

    getRutas = (): Ruta[] => {
        const usuariosController = DEPENDENCY_CONTAINER.get<UsuariosController>(TYPESDEPENDENCIES.UsuariosController);
        return [
            {
                metodo: HTTPMETODO.POST,
                url: '/crear_usuario',
                evento: usuariosController.crearUsuario.bind(usuariosController),
                schema: UsuariosShema.crearUsuario,
            },
            {
                metodo: HTTPMETODO.POST,
                url: '/iniciar_sesion',
                evento: usuariosController.iniciarSesion.bind(usuariosController),
                schema: UsuariosShema.iniciarSesion,
            },
            {
                metodo: HTTPMETODO.PUT,
                url: '/asociar/perfil',
                evento: usuariosController.asociarPerfil.bind(usuariosController),
                schema: UsuariosShema.asociarPerfil,
                handler: {
                    preHandler: [authMiddleware],
                },
            },
        ];
    };

    get ruta(): string {
        return this.moduloRuta;
    }
}
