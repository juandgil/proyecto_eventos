import { IConstultarClientesOut } from '@modules/Usuarioas/usecase/dto/out/IConstultarClientesOut';

export default class Clientes {
    idCliente: number;

    codigoClienteSuite: string;

    activo: boolean;

    nombreMarca: string;

    nombreUrl: string;

    fechaHoraCreacion: Date;

    constructor(cliente: IConstultarClientesOut) {
        this.idCliente = cliente.id_cliente;
        this.codigoClienteSuite = cliente.codigo_cliente_suite;
        this.activo = cliente.activo;
        this.nombreMarca = cliente.nombre_marca;
        this.nombreUrl = cliente.nombre_url;
        this.fechaHoraCreacion = cliente.fecha_hora_creacion;
    }
}
