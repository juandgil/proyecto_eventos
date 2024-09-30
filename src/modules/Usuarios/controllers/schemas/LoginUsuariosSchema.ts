import CustomJoi from '@common/util/JoiMessage';
import { ILoginUsuariosIn } from '@modules/Usuarios/usecase/dto/in';

const LoginUsuariosSchema = CustomJoi.object<ILoginUsuariosIn>({
    correo: CustomJoi.string().required(),
    contrasena: CustomJoi.string().required(),
});

export default LoginUsuariosSchema;
