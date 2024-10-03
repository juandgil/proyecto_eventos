import Joi from 'joi';
import { ICrearAsistenciaIn, IEliminarAsistenciaIn, IConsultarAsistenciaIn } from '../../usecase/dto/in/IAsistenciasIn';

export const ICrearAsistenciaSchema = Joi.object<ICrearAsistenciaIn>({
    id_usuario: Joi.number().required(),
    id_evento: Joi.number().required(),
});

export const IConsultarAsistenciaSchema = Joi.object<IConsultarAsistenciaIn>({
    id: Joi.number().required(),
});

export const IEliminarAsistenciaSchema = Joi.object<IEliminarAsistenciaIn>({
    id: Joi.number().required(),
});

export const IListarAsistenciasSchema = Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    id_usuario: Joi.number().optional(),
    id_evento: Joi.number().optional(),
});
