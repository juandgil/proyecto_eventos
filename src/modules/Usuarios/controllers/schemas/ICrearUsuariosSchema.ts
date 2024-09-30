import CustomJoi from '@common/util/JoiMessage';
import { ICrearUsuariosIn } from '@modules/Usuarios/usecase/dto/in';

const ICrearUsuariosSchema = CustomJoi.object<ICrearUsuariosIn>({
    nombre_usuario: CustomJoi.string().required(),
    correo: CustomJoi.string().email().required(),
    contrasena: CustomJoi.string().required(),
    id_perfil: CustomJoi.number().required(),
});

export default ICrearUsuariosSchema;
