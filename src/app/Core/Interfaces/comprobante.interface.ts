export interface Comprobante {
    id_comprobante?:     number;
    id_tarea:           number;
    url_comprobante?:    string;
    estado_comprobante?: string;
    comentario:         string;
    comprobante?:        string;
    fecha_creacion?:     Date;
    fecha_revision?:     Date;
}
