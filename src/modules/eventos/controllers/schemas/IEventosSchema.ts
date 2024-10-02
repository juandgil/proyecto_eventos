import Joi from 'joi';
import {
    ICrearEventoIn,
    IActualizarEventoIn,
    IEliminarEventoIn,
    IConsultarEventoIn,
} from '../../usecase/dto/in/IEventosIn';

export const ICrearEventoSchema = Joi.object<ICrearEventoIn>({
    titulo: Joi.string().required(),
    descripcion: Joi.string().optional(),
    fecha_inicio: Joi.date().iso().required(),
    fecha_fin: Joi.date().iso().required(),
    id_creador: Joi.number().required(),
    id_ubicacion: Joi.number().required(),
    id_categoria: Joi.number().required(),
});

export const IActualizarEventoSchema = Joi.object<IActualizarEventoIn>({
    id_evento: Joi.number().required(),
    titulo: Joi.string().optional(),
    descripcion: Joi.string().optional(),
    fecha_inicio: Joi.date().iso().optional(),
    fecha_fin: Joi.date().iso().optional(),
    id_creador: Joi.number().optional(),
    id_ubicacion: Joi.number().optional(),
    id_categoria: Joi.number().optional(),
});

export const IConsultarEventoSchema = Joi.object<IConsultarEventoIn>({
    id: Joi.number().required(),
});

export const IEliminarEventoSchema = Joi.object<IEliminarEventoIn>({
    id: Joi.number().required(),
});

export const IListarEventosSchema = Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    fecha_inicio: Joi.date().iso().optional(),
    fecha_fin: Joi.date().iso().optional(),
    id_categoria: Joi.number().optional(),
    id_ubicacion: Joi.number().optional(),
});
