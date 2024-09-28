CREATE TABLE public.clientes (
	id_cliente serial4 NOT NULL,
	codigo_cliente_suite int NOT NULL,
	activo bool DEFAULT true NOT NULL,
	nombre_marca text NOT NULL,
	nombre_url text NOT NULL,
	fecha_hora_creacion timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT clientes_pk PRIMARY KEY (id_cliente)
);

INSERT INTO public.clientes (codigo_cliente_suite,activo,nombre_marca,nombre_url,fecha_hora_creacion) VALUES
	 (1,true,'CM','01','2024-08-05 11:28:15.522282');

INSERT INTO public.clientes (codigo_cliente_suite,activo,nombre_marca,nombre_url,fecha_hora_creacion) VALUES
	 (2,true,'CM','02','2024-08-05 11:28:15.522282');

-- INSERT INTO clientes (cliente_id, codigo_cliente, estado) VALUES(1, '01', true);