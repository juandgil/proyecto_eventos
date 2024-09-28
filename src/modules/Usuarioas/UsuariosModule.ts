import { IModule } from '@common/modules/IModule';
import { HTTPMETODO, Ruta } from '@common/modules/Ruta';
import { DEPENDENCY_CONTAINER } from '@common/dependencies/DependencyContainer';
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
                url: '/:tenantId/usuarios',
                evento: usuariosController.crearUsuario.bind(usuariosController),
                schema: UsuariosShema.crearUsuario,
            },
            {
                metodo: HTTPMETODO.POST,
                url: '/usuarios/admin/suite',
                evento: usuariosController.crearUsuarioSuite.bind(usuariosController),
            },
            {
                metodo: HTTPMETODO.PUT,
                url: '/:tenantId/usuarios/:idUsuario/perfil',
                evento: usuariosController.asociarPerfil.bind(usuariosController),
            },
        ];
    };

    get ruta(): string {
        return this.moduloRuta;
    }
}
