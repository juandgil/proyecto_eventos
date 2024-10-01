import CustomJoi from '@common/util/JoiMessage';
import { ICrearUsuariosIn, ILoginUsuariosIn } from '@modules/Usuarios/usecase/dto/in';

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
