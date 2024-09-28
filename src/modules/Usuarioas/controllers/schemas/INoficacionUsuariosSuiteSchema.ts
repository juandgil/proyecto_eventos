import CustomJoi from '@common/util/JoiMessage';
import { INotificacionUsuariosSuiteIn } from '@modules/Usuarioas/usecase/dto/in/INotificacionesUsuariosSuiteIn';

const INoficacionUsuariosSuiteSchema = CustomJoi.object<INotificacionUsuariosSuiteIn>({
    correo: CustomJoi.string().email().required(),
    nombres: CustomJoi.string().required(),
    apellidos: CustomJoi.string().required(),
    tipo_identificacion: CustomJoi.string().required(),
    identificacion: CustomJoi.string().required(),
    telefono: CustomJoi.string().required(),
    contrasena: CustomJoi.string().required(),
    codigo_cliente: CustomJoi.number().required(),
});

export default INoficacionUsuariosSuiteSchema;
