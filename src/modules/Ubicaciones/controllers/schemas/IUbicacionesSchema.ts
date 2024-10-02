import Joi from 'joi';
import {
    ICrearUbicacionIn,
    IActualizarUbicacionIn,
    IEliminarUbicacionIn,
    IConsultarUbicacionIn,
} from '../../usecase/dto/in/IUbicacionesIn';

export const ICrearUbicacionSchema = Joi.object<ICrearUbicacionIn>({
    nombre: Joi.string().required(),
    direccion: Joi.string().required(),
    latitud: Joi.number().required(),
    longitud: Joi.number().required(),
});

export const IActualizarUbicacionSchema = Joi.object<IActualizarUbicacionIn>({
    id_ubicacion: Joi.number().required(),
    nombre: Joi.string().optional(),
    direccion: Joi.string().optional(),
    latitud: Joi.number().optional(),
    longitud: Joi.number().optional(),
    // Eliminar la validación de descripción
});

export const IConsultarUbicacionSchema = Joi.object<IConsultarUbicacionIn>({
    id: Joi.number().required(),
});

export const IEliminarUbicacionSchema = Joi.object<IEliminarUbicacionIn>({
    id: Joi.number().required(),
});

export const IListarUbicacionesSchema = Joi.object({
    // parámetros de consulta si es necesario, por ejemplo:
    // page: Joi.number().optional(),
    // limit: Joi.number().optional(),
});
