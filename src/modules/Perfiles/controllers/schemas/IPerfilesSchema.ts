import Joi from 'joi';
import {
    ICrearPerfilIn,
    IActualizarPerfilIn,
    IListarPerfilesIn,
    IEliminarPerfilIn,
    IConstultarPerfilesIn,
} from '../../usecase/dto/in/IPerfilesIn';

export const ICrearPerfilSchema = Joi.object<ICrearPerfilIn>({
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
});

export const IActualizarPerfilSchema = Joi.object<IActualizarPerfilIn>({
    id_perfil: Joi.number().required(),
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
});

export const IListarPerfilSchema = Joi.object<IListarPerfilesIn>({
    id_perfil: Joi.number().required(),
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
});

export const IConsultarPerfilSchema = Joi.object<IConstultarPerfilesIn>({
    id: Joi.number().required(),
});

export const IEliminarPerfilSchema = Joi.object<IEliminarPerfilIn>({
    id: Joi.number().required(),
});
