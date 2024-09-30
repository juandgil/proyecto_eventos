import CustomJoi from '@common/util/JoiMessage';
import { ICrearUsuariosSuiteIn } from '@modules/Usuarios/usecase/dto/in/ICrearUsuariosSuiteIn';

const ICrearUsuariosSuiteSchema = CustomJoi.object<ICrearUsuariosSuiteIn>({
    correo_usuario: CustomJoi.string().email().required(),
    codigo_cliente_suite: CustomJoi.number().required(),
});

export default ICrearUsuariosSuiteSchema;
