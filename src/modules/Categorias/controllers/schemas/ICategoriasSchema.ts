import Joi from 'joi';
import {
    ICrearCategoriaIn,
    IActualizarCategoriaIn,
    IEliminarCategoriaIn,
    IConsultarCategoriaIn,
} from '../../usecase/dto/in/ICategoriasIn';

export const ICrearCategoriaSchema = Joi.object<ICrearCategoriaIn>({
    nombre: Joi.string().required(),
    descripcion: Joi.string().optional(),
});

export const IActualizarCategoriaSchema = Joi.object<IActualizarCategoriaIn>({
    id_categoria: Joi.number().required(),
    nombre: Joi.string().required(),
});

export const IConsultarCategoriaSchema = Joi.object<IConsultarCategoriaIn>({
    id: Joi.number().required(),
});

export const IEliminarCategoriaSchema = Joi.object<IEliminarCategoriaIn>({
    id: Joi.number().required(),
});

export const IListarCategoriasSchema = Joi.object({
    // parámetros de consulta si es necesario, por ejemplo:
    // page: Joi.number().optional(),
    // limit: Joi.number().optional(),
});
