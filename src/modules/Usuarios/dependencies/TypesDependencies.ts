const TYPESDEPENDENCIES = {
    CrearUsuariosUseCase: Symbol.for('CrearUsuariosUseCase'),
    GenerarTokenUseCase: Symbol.for('GenerarTokenUseCase'),
    ColasUsuarioSuiteUseCase: Symbol.for('ColasUsuarioSuiteUseCase'),
    UsuariosController: Symbol.for('UsuariosController'),
    UsuariosRepository: Symbol.for('UsuariosRepository'),
    ClientesRepository: Symbol.for('ClientesRepository'),
    PerfilesRepository: Symbol.for('PerfilesRepository'),
    CrearUsuariosSuiteUseCase: Symbol.for('CrearUsuariosSuiteUseCase'),
    AsociarPerfilUseCase: Symbol.for('AsociarPerfilUseCase'),
    StatusGetController: Symbol.for('StatusGetController'),
    dbCmUsuarios: Symbol.for('dbCmUsuarios'),
    dbCm: Symbol.for('dbCm'),
    NotificacionUsuariosCreadoRepository: Symbol.for('NotificacionUsuariosCreadoRepository'),
    EnviarCorreosRepository: Symbol.for('EnviarCorreosRepository'),
    AuthService: Symbol.for('AuthService'),
    ActualizarUsuarioUseCase: Symbol.for('ActualizarUsuarioUseCase'),
    InactivarUsuarioUseCase: Symbol.for('InactivarUsuarioUseCase'), // Cambiado de InactivarUsuarioUseCase a InactivarUsuarioUseCase
    ConsultarUsuarioUseCase: Symbol.for('ConsultarUsuarioUseCase'),
    ListarUsuariosUseCase: Symbol.for('ListarUsuariosUseCase'),
};

export default TYPESDEPENDENCIES;
