const TYPESDEPENDENCIES = {
    CategoriasRepository: Symbol.for('CategoriasRepository'),
    CrearCategoriaUseCase: Symbol.for('CrearCategoriaUseCase'),
    ActualizarCategoriaUseCase: Symbol.for('ActualizarCategoriaUseCase'),
    EliminarCategoriaUseCase: Symbol.for('EliminarCategoriaUseCase'),
    ConsultarCategoriaUseCase: Symbol.for('ConsultarCategoriaUseCase'),
    ListarCategoriasUseCase: Symbol.for('ListarCategoriasUseCase'),
    CategoriasController: Symbol.for('CategoriasController'),
};

export default TYPESDEPENDENCIES;
