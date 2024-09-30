import CustomJoi from '@common/util/JoiMessage';
import { IAsociarPerfilIn } from '@modules/Usuarioas/usecase/dto/in/IAsociarPerfilIn';

const IAsociarPerfilSchema = CustomJoi.object<IAsociarPerfilIn>({
    perfil: CustomJoi.number().required(),
    id_usuario: CustomJoi.number().required(),
});

export default IAsociarPerfilSchema;
