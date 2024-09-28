import CustomJoi from '@common/util/JoiMessage';
import { IGuardarUsuariosFIn } from '@modules/Usuarioas/usecase/dto/in';

const ICrearUsuariosSchema = CustomJoi.object<IGuardarUsuariosFIn>({
    nombres: CustomJoi.string().required(),
    apellidos: CustomJoi.string().required(),
    tipo_identificacion: CustomJoi.string().required(),
    identificacion: CustomJoi.string().required(),
    telefono: CustomJoi.optional(),
    id_perfil: CustomJoi.number().allow(null).optional().default(null),
    correo: CustomJoi.string().email().required(),
});

export default ICrearUsuariosSchema;
