const TYPESDEPENDENCIES = {
    UbicacionesController: Symbol.for('UbicacionesController'),
    UbicacionesRepository: Symbol.for('UbicacionesRepository'),
    CrearUbicacionUseCase: Symbol.for('CrearUbicacionUseCase'),
    ActualizarUbicacionUseCase: Symbol.for('ActualizarUbicacionUseCase'),
    EliminarUbicacionUseCase: Symbol.for('EliminarUbicacionUseCase'),
    ConsultarUbicacionUseCase: Symbol.for('ConsultarUbicacionUseCase'),
    ListarUbicacionesUseCase: Symbol.for('ListarUbicacionesUseCase'),
    ObtenerUbicacionesCercanasUseCase: Symbol.for('ObtenerUbicacionesCercanasUseCase'),
    ApiServiceAxios: Symbol.for('ApiServiceAxios'),
};

export default TYPESDEPENDENCIES;
