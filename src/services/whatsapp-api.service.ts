import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const fetch = require('node-fetch');
//npm install  npm i node-fetch@2.7.0
@injectable({scope: BindingScope.TRANSIENT})
export class WhatsappApiService {
  constructor(/* Add @inject to inject parameters */) {}

/*
   * Add service methods here
   */
  async EnviarMensajeWhatsapp(datos: any, url: string): Promise<void> {
	  console.log(datos);
	  console.log(url);
    try {
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(datos),
        headers: {'Content-Type': 'application/json'},
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const text = await response.text();
      console.log ('Respuesta:', text);


    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  }
}
