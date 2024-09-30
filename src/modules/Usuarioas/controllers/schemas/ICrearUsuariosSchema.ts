import CustomJoi from '@common/util/JoiMessage';
import { ICrearUsuariosIn } from '@modules/Usuarioas/usecase/dto/in';

const ICrearUsuariosSchema = CustomJoi.object<ICrearUsuariosIn>({
    nombre_usuario: CustomJoi.string().required(),
    correo: CustomJoi.string().email().required(),
    contrasena: CustomJoi.string().required(),
    perfil_id: CustomJoi.number().required(),
});

export default ICrearUsuariosSchema;
