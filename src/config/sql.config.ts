export namespace SQLConfig {

  export const CrearUsuario: string = "SELECT FUN_INSERTAR_USUARIOS($1,$2,$3,$4,$5,$6);";
  export const ObtenerDepartamento: string = "SELECT FUN_OBTENER_DPTOS();";
  export const ObtenerCiudad: string = "SELECT FUN_OBTENER_CIUDADES($1);";

}
