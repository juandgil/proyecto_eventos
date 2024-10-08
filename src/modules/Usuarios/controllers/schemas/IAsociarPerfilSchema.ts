import CustomJoi from '@common/util/JoiMessage';
import { IAsociarPerfilIn } from '@modules/Usuarios/usecase/dto/in/IAsociarPerfilIn';

const IAsociarPerfilSchema = CustomJoi.object<IAsociarPerfilIn>({
    id_perfil: CustomJoi.number().required(),
    id_usuario: CustomJoi.number().required(),
});

export default IAsociarPerfilSchema;
