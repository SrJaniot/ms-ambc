// Uncomment these imports to begin using these cool features!

import {inject, service} from "@loopback/core";
import {DefaultCrudRepository, juggler} from "@loopback/repository";
import {get, getModelSchemaRef, param, post, requestBody, response} from "@loopback/rest";
import {ConfiguracionSeguridad} from "../config/configuracion.seguridad";
import {SQLConfig} from "../config/sql.config";
import {GenericModel, ModelInsertEvento, ModelInsertUsuario, ModelInsertUsuarioReferido} from "../models";
import {WhatsappApiService} from "../services";
import {authenticate} from '@loopback/authentication';

// import {inject} from '@loopback/core';


export class UsuariosController {

  //Generacion de un repositorio generico para conectarme a la base de datos postgresql
  private genericRepository: DefaultCrudRepository<GenericModel, typeof GenericModel.prototype.id>;

  constructor(
    // inyectar el datasource de postgresql
    @inject('datasources.postgres') dataSource: juggler.DataSource,
    // llamar al sevicio de whatsapp
    @service(WhatsappApiService)
    public WhatsappService: WhatsappApiService,
  ) {
    //configuracion del genericRepository para que se conecte a la base de datos postgresql
    this.genericRepository = new DefaultCrudRepository<any, any>(
      GenericModel,
      dataSource
    );
  }






  //Obtener eventos CON METODO GET
  @get('/Obtenereventos')
  @response(200, {
    description: 'Obtener Obtenereventos ',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GenericModel),
      },
    },
  })
  async Obtenereventos(
  ): Promise<object> {
    try {
      //const sql =SQLConfig.crearContexto;
      // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
      const sql = SQLConfig.ObtenerEventos;

      //console.log(sql);
      //console.log(params);
      const result = await this.genericRepository.dataSource.execute(sql);
      //console.log(result[0]);
      //FUN_OBTENEREVENTOS() fun_obtenereventos
      if (result[0].fun_obtenereventos.CODIGO != 200) {
        return {
          "CODIGO": result[0].fun_obtenereventos.CODIGO,
          "MENSAJE": result[0].fun_obtenereventos.MENSAJE,
          "DATOS": null
        };
      }
      return {
        "CODIGO": result[0].fun_obtenereventos.CODIGO,
        "MENSAJE": result[0].fun_obtenereventos.MENSAJE,
        "DATOS": result[0].fun_obtenereventos.DATOS
      };
    } catch (error) {
      return {
        "CODIGO": 500,
        "MENSAJE": "Error POSTGRES",
        "DATOS": error
      };
    }
  }





  //endpoint crear evento

  @authenticate({
    strategy: 'auth',
    options: [ConfiguracionSeguridad.menueventos, ConfiguracionSeguridad.guardarAccion]
  })
  @post('/CrearEvento')
  @response(200, {
    description: 'creacion de un Evento',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ModelInsertEvento),
      },
    },
  })
  async crearEvento(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModelInsertEvento),
        },
      },
    })
    data: ModelInsertEvento,
  ): Promise<object> {
    try {
      //const sql =SQLConfig.crearContexto;
      // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
      const sql = SQLConfig.CrearEvento;
      const params = [
        data.nombre_evento,
        data.lugar_evento,
        data.fecha_inicio,
        data.ciudad_id,
        data.fecha_fin,
      ];
      const result = await this.genericRepository.dataSource.execute(sql, params);
      //console.log(result[0]);
      //console.log(result[0]);
      //console.log(result[0].fun_insertar_contexto_json);
      //console.log(result[0].fun_insert_torneo.id_torneo);
      //FUN_CREAREVENTO   fun_crearevento
      if (result[0].fun_crearevento.CODIGO != 200) {
        return {
          "CODIGO": result[0].fun_crearevento.CODIGO,
          "MENSAJE": result[0].fun_crearevento.MENSAJE,
        };
      }
      return {
        "CODIGO": result[0].fun_crearevento.CODIGO,
        "MENSAJE": result[0].fun_crearevento.MENSAJE,
        "ID": result[0].fun_crearevento.ID,

      };



    } catch (error) {
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al insertar datos  del USUARIO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
  }



  //endpoint para crear un usuario



  @post('/CrearUsuario')
  @response(200, {
    description: 'creacion de un usuario',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ModelInsertUsuario),
      },
    },
  })
  async crearinstitucion(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModelInsertUsuario),
        },
      },
    })
    data: ModelInsertUsuario,
  ): Promise<object> {
    try {
      //const sql =SQLConfig.crearContexto;
      // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
      const sql = SQLConfig.CrearUsuario;
      const params = [
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
      if (result[0].fun_insertar_usuarios.CODIGO != 200) {
        return {
          "CODIGO": result[0].fun_insertar_usuarios.CODIGO,
          "MENSAJE": result[0].fun_insertar_usuarios.MENSAJE,
        };
      } else {

        const urlWhatsapp = ConfiguracionSeguridad.urlWhatsappMensaje; // URL del servicio de WhatsApp
        let datosWhatsapp = {
          message: `${data.nombres}  bienvenidos a la red de amigos BCC 🥳, es muy grato contar con su presencia, un abrazo gigante  lleno de gratitud y aprecio 🫂 \n \n Comparte tu link de referido :  https://amigoscelis.gestionpolitica.com/register/${result[0].fun_insertar_usuarios.ID} `, // Mensaje de felicitación
          number: "57" + data.whatsapp, // Número
          urlMedia: `https://amigoscelis.gestionpolitica.com:3007/referido_qr?ref=${result[0].fun_insertar_usuarios.ID}`
        };
        console.log(datosWhatsapp);
        await this.WhatsappService.EnviarMensajeWhatsapp(datosWhatsapp, urlWhatsapp!); // Envía el mensaje
        return {
          "CODIGO": result[0].fun_insertar_usuarios.CODIGO,
          "MENSAJE": result[0].fun_insertar_usuarios.MENSAJE,
          "ID": result[0].fun_insertar_usuarios.ID,

        };

      }

    } catch (error) {
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al insertar datos  del USUARIO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
  }



  @post('/CrearUsuarioReferido')
  @response(200, {
    description: 'creacion de un usuario referido',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ModelInsertUsuarioReferido),
      },
    },
  })
  async crearusuarioreferido(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModelInsertUsuarioReferido),
        },
      },
    })
    data: ModelInsertUsuarioReferido,
  ): Promise<object> {
    try {
      //const sql =SQLConfig.crearContexto;
      // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
      const sql = SQLConfig.CrearUsuarioReferido;
      const params = [
        data.nombres,
        data.Apellidos,
        data.Whatsapp,
        data.Correo,
        data.Num_documento,
        data.Id_Ciudad,
        data.Id_Referido

      ];
      const result = await this.genericRepository.dataSource.execute(sql, params);
      //console.log(result[0]);
      //console.log(result[0]);
      //console.log(result[0].fun_insertar_contexto_json);
      //console.log(result[0].fun_insert_torneo.id_torneo);
      //FUN_INSERTAR_USUARIOS_REFERIDOS    fun_insertar_usuarios_referidos
      if (result[0].fun_insertar_usuarios_referidos.CODIGO != 200) {
        return {
          "CODIGO": result[0].fun_insertar_usuarios_referidos.CODIGO,
          "MENSAJE": result[0].fun_insertar_usuarios_referidos.MENSAJE,
        };
      } else {

        const urlWhatsapp = ConfiguracionSeguridad.urlWhatsappMensaje; // URL del servicio de WhatsApp
        let datosWhatsapp = {
          message: `${data.nombres}  bienvenidos a la red de amigos BCC 🥳, es muy grato contar con su presencia, un abrazo gigante  lleno de gratitud y aprecio 🫂 \n \n  Si quieres ayudar a tu referido comparte:  https://amigoscelis.gestionpolitica.com/register/${result[0].fun_insertar_usuarios_referidos.ID} `, // Mensaje de felicitación
          number: "57" + data.Whatsapp, // Número
          urlMedia: `https://amigoscelis.gestionpolitica.com:3007/referido_qr?ref=${result[0].fun_insertar_usuarios_referidos.ID}`

        };
        console.log(datosWhatsapp);
        await this.WhatsappService.EnviarMensajeWhatsapp(datosWhatsapp, urlWhatsapp!); // Envía el mensaje
        return {
          "CODIGO": result[0].fun_insertar_usuarios_referidos.CODIGO,
          "MENSAJE": result[0].fun_insertar_usuarios_referidos.MENSAJE,
          "ID": result[0].fun_insertar_usuarios_referidos.ID,

        };

      }

    } catch (error) {
      return {
        "CODIGO": 500,
        "MENSAJE": "Error al insertar datos  del USUARIO en la funcion de postgres ERROR POSTGRES",
        "DATOS": error
      };
    }
  }










  @get('/ObtenerUsuarioReferido/{id_referido}')
  @response(200, {
    description: 'Obtener programa usuario por id referido',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GenericModel),
      },
    },
  })
  async ObtenerUsuarioReferidos(
    @param.path.number('id_referido') id_referido: number,
  ): Promise<object> {
    try {
      //const sql =SQLConfig.crearContexto;
      // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
      const sql = SQLConfig.ObtenerUsuarioReferido;
      const params = [
        id_referido
      ];
      //console.log(sql);
      //console.log(params);
      const result = await this.genericRepository.dataSource.execute(sql, params);
      //console.log(result[0]);
      //FUN_CONSULTAR_USUARIO_REFERIDO() fun_consultar_usuario_referido
      if (result[0].fun_consultar_usuario_referido.CODIGO != 200) {
        return {
          "CODIGO": result[0].fun_consultar_usuario_referido.CODIGO,
          "MENSAJE": result[0].fun_consultar_usuario_referido.MENSAJE,
          "DATOS": null
        };
      }
      return {
        "CODIGO": result[0].fun_consultar_usuario_referido.CODIGO,
        "MENSAJE": result[0].fun_consultar_usuario_referido.MENSAJE,
        "DATOS": result[0].fun_consultar_usuario_referido.DATOS
      };
    } catch (error) {
      return {
        "CODIGO": 500,
        "MENSAJE": "Error POSTGRES",
        "DATOS": error
      };
    }
  }










  //METODO GET PARA OBTENER DATOS DE LA TABLA DEPARTAMENTO USANDO EL REPOSITORIO GENERICO NO PIDO PARAMETROS
  @get('/ObtenerDepartamento')
  @response(200, {
    description: 'Obtener Departamento',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GenericModel),
      },
    },
  })
  async obtenerProgramasEstudio(): Promise<object> {
    try {
      //const sql =SQLConfig.crearContexto;
      // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
      const sql = SQLConfig.ObtenerDepartamento;
      const result = await this.genericRepository.dataSource.execute(sql);
      // FUN_OBTENER_DPTOS()  fun_obtener_dptos
      if (result[0].fun_obtener_dptos.CODIGO != 200) {
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


    } catch (error) {
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
    content: {
      'application/json': {
        schema: getModelSchemaRef(GenericModel),
      },
    },
  })
  async obtenerProgramaEstudioID(
    @param.path.number('id_departamento') id_departamento: number,
  ): Promise<object> {
    try {
      //const sql =SQLConfig.crearContexto;
      // EN ESTE CASO ESTA FUNCION RETORNA UN JSON DESDE POSTGRES
      const sql = SQLConfig.ObtenerCiudad;
      const params = [
        id_departamento
      ];
      //console.log(sql);
      //console.log(params);
      const result = await this.genericRepository.dataSource.execute(sql, params);
      //console.log(result[0]);
      //FUN_OBTENER_CIUDADES() fun_obtener_ciudades()
      if (result[0].fun_obtener_ciudades.CODIGO != 200) {
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
    } catch (error) {
      return {
        "CODIGO": 500,
        "MENSAJE": "Error POSTGRES",
        "DATOS": error
      };
    }
  }

























}
