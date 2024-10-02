import CustomJoi from '@common/util/JoiMessage';
import { ICrearUsuariosIn, ILoginUsuariosIn, IActualizarUsuarioIn } from '@modules/Usuarios/usecase/dto/in';

export const ICrearUsuariosSchema = CustomJoi.object<ICrearUsuariosIn>({
    nombre_usuario: CustomJoi.string().required(),
    correo: CustomJoi.string().email().required(),
    contrasena: CustomJoi.string().required(),
    id_perfil: CustomJoi.number().optional().default(1),
});

export const LoginUsuariosSchema = CustomJoi.object<ILoginUsuariosIn>({
    correo: CustomJoi.string().required(),
    contrasena: CustomJoi.string().required(),
});

export const IActualizarUsuarioSchema = CustomJoi.object<IActualizarUsuarioIn>({
    id_usuario: CustomJoi.number().required(),
    nombre_usuario: CustomJoi.string().optional(),
    correo: CustomJoi.string().email().optional(),
    contrasena: CustomJoi.string().optional(),
    id_perfil: CustomJoi.number().optional(),
});

export const InactivarUsuarioUseCase = CustomJoi.object({
    id: CustomJoi.number().required(),
});

export const InactivarUsuarioSchema = CustomJoi.object({
    id: CustomJoi.number().required(),
});
