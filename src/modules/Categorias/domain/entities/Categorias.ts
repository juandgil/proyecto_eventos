export default class Categorias {
    id_categoria?: number;

    nombre: string;

    creado_en?: Date;

    actualizado_en?: Date;

    constructor(data: { nombre: string; id_categoria?: number; creado_en?: Date; actualizado_en?: Date }) {
        this.id_categoria = data.id_categoria;
        this.nombre = data.nombre;
        this.creado_en = data.creado_en;
        this.actualizado_en = data.actualizado_en;
    }
}
