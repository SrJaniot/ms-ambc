
export namespace ConfiguracionSeguridad{
  //-------------------------VARIABLES DE ENTORNO  -------------------------------------
    //instalar el paquete dotenv npm i dotenv para poder leer variables de entorno  y importar en application.ts require('dotenv').config();
    export const connection_user_postgres = process.env.CONNECTION_USER_POSTGRES ;
    export const connection_password_postgres = process.env.CONNECTION_PASSWORD_POSTGRES ;
    export const connection_database_postgres = process.env.CONNECTION_DATABASE_POSTGRES ;
    export const connection_host_postgres = process.env.CONNECTION_HOST_POSTGRES ;
    export const connection_port_postgres = process.env.CONNECTION_PORT_POSTGRES ;
    export const urlWhatsappMensaje = process.env.URL_WHATSAPP_MENSAJE ;

    //
    //cambiar esta ruta por la url del server con el puerto a la api de seguridad
    export const hostSeguridad = process.env.CONECTION_SEGURIDAD ;


   //-------------------------menus -------------------------------------
   export const menueventos = 1;
   export const menureferidos = 2;

   //-------------------------acciones -------------------------------------
   export const listarAccion = "listar";
   export const guardarAccion = "guardar";
   export const eliminarAccion = "eliminar";
   export const editarAccion = "editar";
   export const buscarAccion_id = "buscar_id";

   //-------------------------roles -------------------------------------
   //TENER EN CUENTA QUE TOCA INSERTAR LOS ROLES EN LA BASE DE DATOS
   export const rolAdministradorID = 1;
   export const rolLider = 2;






}
