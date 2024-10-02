const TYPESDEPENDENCIES = {
    EventosController: Symbol.for('EventosController'),
    EventosRepository: Symbol.for('EventosRepository'),
    CrearEventoUseCase: Symbol.for('CrearEventoUseCase'),
    ActualizarEventoUseCase: Symbol.for('ActualizarEventoUseCase'),
    EliminarEventoUseCase: Symbol.for('EliminarEventoUseCase'),
    ConsultarEventoUseCase: Symbol.for('ConsultarEventoUseCase'),
    ListarEventosUseCase: Symbol.for('ListarEventosUseCase'),
};

export default TYPESDEPENDENCIES;
