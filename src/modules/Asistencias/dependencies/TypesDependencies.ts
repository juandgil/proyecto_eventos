const TYPESDEPENDENCIES = {
    AsistenciasController: Symbol.for('AsistenciasController'),
    AsistenciasRepository: Symbol.for('AsistenciasRepository'),
    CrearAsistenciaUseCase: Symbol.for('CrearAsistenciaUseCase'),
    ConsultarAsistenciaUseCase: Symbol.for('ConsultarAsistenciaUseCase'),
    ListarAsistenciasUseCase: Symbol.for('ListarAsistenciasUseCase'),
};

export default TYPESDEPENDENCIES;
