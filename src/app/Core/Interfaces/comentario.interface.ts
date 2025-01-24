export interface Comentario {
    id_comentario?:    number;
    id_tarea:         number | undefined;
    id_usuario:       number;
    comentario:       string;
    fecha_comentario?: Date;
}
