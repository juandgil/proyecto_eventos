import { IModule } from '@common/modules/IModule';
import { Ruta } from '@common/modules/Ruta';
import createDependencies from './dependencies/Dependencies';

export default class PerfilesModule implements IModule {
    private moduloRuta = '/perfiles';

    constructor() {
        createDependencies();
    }

    getRutas = (): Ruta[] => {
        return [];
    };

    get ruta(): string {
        return this.moduloRuta;
    }
}
