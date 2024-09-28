CREATE TABLE public.perfiles (
	id_perfil serial4 NOT NULL,
	es_maestro bool DEFAULT false NOT NULL,
	nombre varchar NULL,
	CONSTRAINT perfiles_pk PRIMARY KEY (id_perfil)
);

INSERT INTO public.perfiles (es_maestro,nombre) VALUES
	 (true,'MAESTRO CM');

CREATE TABLE public.usuarios (
	id_usuario serial4 NOT NULL,
	correo text NOT NULL,
	activo bool DEFAULT true NOT NULL,
	sincronizacion_suite bool DEFAULT false NOT NULL,
	estado_sincronizacion text NULL,
	id_perfil int4 NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (id_usuario),
	CONSTRAINT usuarios_unique UNIQUE (correo),
	CONSTRAINT usuarios_perfiles_fk FOREIGN KEY (id_perfil) REFERENCES public.perfiles(id_perfil)
);

INSERT INTO public.usuarios (correo,activo,sincronizacion_suite,estado_sincronizacion,id_perfil) VALUES
	 ('prueba01@gmail.com',true,false,'pendiente',1);
