const TYPESDEPENDENCIES = {
    UbicacionesController: Symbol.for('UbicacionesController'),
    UbicacionesRepository: Symbol.for('UbicacionesRepository'),
    CrearUbicacionUseCase: Symbol.for('CrearUbicacionUseCase'),
    ActualizarUbicacionUseCase: Symbol.for('ActualizarUbicacionUseCase'),
    EliminarUbicacionUseCase: Symbol.for('EliminarUbicacionUseCase'),
    ConsultarUbicacionUseCase: Symbol.for('ConsultarUbicacionUseCase'),
    ListarUbicacionesUseCase: Symbol.for('ListarUbicacionesUseCase'),
};

export default TYPESDEPENDENCIES;
