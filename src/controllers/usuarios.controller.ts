// Uncomment these imports to begin using these cool features!

import { inject, service } from "@loopback/core";
import { DefaultCrudRepository, juggler } from "@loopback/repository";
import { GenericModel, ModelInsertUsuario } from "../models";
import { get, getModelSchemaRef, param, post, requestBody, response } from "@loopback/rest";
import { SQLConfig } from "../config/sql.config";
import { ConfiguracionSeguridad } from "../config/configuracion.seguridad";
import { WhatsappApiService } from "../services";

// import {inject} from '@loopback/core';


export class UsuariosController {
  
//Generacion de un repositorio generico para conectarme a la base de datos postgresql
private genericRepository: DefaultCrudRepository <GenericModel, typeof GenericModel.prototype.id>;

constructor(
  // inyectar el datasource de postgresql
  @inject('datasources.postgres') dataSource:  juggler.DataSource,
  // llamar al sevicio de whatsapp
  @service(WhatsappApiService)
  public WhatsappService: WhatsappApiService,
) {
  //configuracion del genericRepository para que se conecte a la base de datos postgresql
  this.genericRepository = new DefaultCrudRepository<any,any>(
    GenericModel,
    dataSource
  );
}



@post('/CrearUsuario')
@response(200, {
  description: 'creacion de un usuario',
  content:{
    'application/json':{
      schema: getModelSchemaRef(ModelInsertUsuario),
    },
  },
})
async crearinstitucion(
  @requestBody({
    content:{
      'application/json':{
        schema: getModelSchemaRef(ModelInsertUsuario),
      },
    },
  })
  data: ModelInsertUsuario,
):Promise<object>{
  try{
    //const sql =SQLConfig.crearContexto;
    // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
    const sql = SQLConfig.CrearUsuario;
    const params =[
      data.nombres,
      data.apellidos,
      data.whatsapp,
      data.correo,
      data.num_documento,
      data.Id_ciudad
   
    ];
    const result = await this.genericRepository.dataSource.execute(sql, params);
    //console.log(result[0]);
    //console.log(result[0]);
    //console.log(result[0].fun_insertar_contexto_json);
    //console.log(result[0].fun_insert_torneo.id_torneo);
    //FUN_INSERTAR_USUARIOS   fun_insertar_usuarios
    if(result[0].fun_insertar_usuarios.CODIGO !=200){
      return {
        "CODIGO": result[0].fun_insertar_usuarios.CODIGO,
        "MENSAJE": result[0].fun_insertar_usuarios.MENSAJE,
      };
    }else{

      const urlWhatsapp = ConfiguracionSeguridad.urlWhatsappMensaje; // URL del servicio de WhatsApp
      let datosWhatsapp = {
        message: `${data.nombres}  bienvenida a la red de amigos BCC 🥳, es muy grato contar con su presencia, un abrazo gigante  lleno de gratitud y aprecio 🫂`, // Mensaje de felicitación
        number: "57"+data.whatsapp // Número
      };
      console.log(datosWhatsapp);
      await this.WhatsappService.EnviarMensajeWhatsapp(datosWhatsapp, urlWhatsapp!); // Envía el mensaje
      return {
        "CODIGO": result[0].fun_insertar_usuarios.CODIGO,
        "MENSAJE": result[0].fun_insertar_usuarios.MENSAJE,
      };

    }

  }catch(error){
    return {
      "CODIGO": 500,
      "MENSAJE": "Error al insertar datos  del USUARIO en la funcion de postgres ERROR POSTGRES",
      "DATOS": error
    };
  }
}






 //METODO GET PARA OBTENER DATOS DE LA TABLA DEPARTAMENTO USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
 @get('/ObtenerDepartamento')
 @response(200, {
   description: 'Obtener Departamento',
   content:{
     'application/json':{
       schema: getModelSchemaRef(GenericModel),
     },
   },
 })
 async obtenerProgramasEstudio():Promise<object>{
   try{
     //const sql =SQLConfig.crearContexto;
     // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
     const sql = SQLConfig.ObtenerDepartamento;
     const result = await this.genericRepository.dataSource.execute(sql);
     // FUN_OBTENER_DPTOS()  fun_obtener_dptos
     if(result[0].fun_obtener_dptos.CODIGO !=200){
       return {
         "CODIGO": result[0].fun_obtener_dptos.CODIGO,
         "MENSAJE": result[0].fun_obtener_dptos.MENSAJE,
         "DATOS": null
       };
     }
     return {
       "CODIGO": result[0].fun_obtener_dptos.CODIGO,
       "MENSAJE": result[0].fun_obtener_dptos.MENSAJE,
       "DATOS": result[0].fun_obtener_dptos.DATOS
     };


   }catch(error){
     return {
       "CODIGO": 500,
       "MENSAJE": "Error POSTGRES",
       "DATOS": error
     };
   }
 }



 @get('/ObtenerCiudades/{id_departamento}')
@response(200, {
 description: 'Obtener programa ciudad por id departamento',
 content:{
   'application/json':{
     schema: getModelSchemaRef(GenericModel),
   },
 },
})
async obtenerProgramaEstudioID(
 @param.path.number('id_departamento') id_departamento: number,
):Promise<object>{
 try{
   //const sql =SQLConfig.crearContexto;
   // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
   const sql = SQLConfig.ObtenerCiudad;
   const params =[
    id_departamento
   ];
   //console.log(sql);
   //console.log(params);
   const result = await this.genericRepository.dataSource.execute(sql, params);
   //console.log(result[0]);
   //FUN_OBTENER_CIUDADES() fun_obtener_ciudades()
   if(result[0].fun_obtener_ciudades.CODIGO !=200){
     return {
       "CODIGO": result[0].fun_obtener_ciudades.CODIGO,
       "MENSAJE": result[0].fun_obtener_ciudades.MENSAJE,
       "DATOS": null
     };
   }
   return {
     "CODIGO": result[0].fun_obtener_ciudades.CODIGO,
     "MENSAJE": result[0].fun_obtener_ciudades.MENSAJE,
     "DATOS": result[0].fun_obtener_ciudades.DATOS
   };
 }catch(error){
   return {
     "CODIGO": 500,
     "MENSAJE": "Error POSTGRES",
     "DATOS": error
   };
 }
}

























}
