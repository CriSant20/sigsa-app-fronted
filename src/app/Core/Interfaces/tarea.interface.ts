export interface Tarea {
    id?:                  number;
    usuario_cliente_id:  number;
    nombre:              string;
    tipo_tarea:          string;
    indicaciones:        string;
    rubrica:             string;
    estado?:              string;
    adjunto_url?:         string;
    adjunto?:             File;
    tarea_realizada_url?: null | string;
    costo?:               number | null;
    fecha_envio?:         Date;
    fecha_a_realizar:    Date | string;
    fecha_realizada?:     Date | null;
    comentarios?:         Comentario[];
    encuestas?:           Encuesta[];
}

export interface Comentario {
    id_comentario?:    number;
    id_tarea:         number;
    id_usuario:       number;
    comentario:       string;
    fecha_comentario?: Date;
}

export interface Encuesta {
    encuesta_id:    number;
    id_tarea:       number;
    atencion:       string;
    costo:          string;
    calidad:        string;
    nota:           number;
    fecha_encuesta: Date;
}
