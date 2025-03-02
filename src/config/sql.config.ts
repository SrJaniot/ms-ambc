export namespace SQLConfig {

  export const CrearUsuario: string = "SELECT FUN_INSERTAR_USUARIOS($1,$2,$3,$4,$5,$6);";
  export const ObtenerDepartamento: string = "SELECT FUN_OBTENER_DPTOS();";
  export const ObtenerCiudad: string = "SELECT FUN_OBTENER_CIUDADES($1);";
  export const CrearUsuarioReferido: string = "SELECT FUN_INSERTAR_USUARIOS_REFERIDOS($1,$2,$3,$4,$5,$6,$7);";
  export const ObtenerUsuarioReferido: string = "SELECT FUN_CONSULTAR_USUARIO_REFERIDO($1);";
  export const CrearEvento: string = "SELECT FUN_CREAREVENTO($1,$2,$3,$4,$5);";
  export const ObtenerEventos: string = "SELECT FUN_OBTENEREVENTOS();";

}
