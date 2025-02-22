import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertUsuario extends Model {
  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'number',
    required: true,
  })
  whatsapp: number;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  num_documento: string;

  @property({
    type: 'number',
    required: true,
  })
  Id_ciudad: number;


  constructor(data?: Partial<ModelInsertUsuario>) {
    super(data);
  }
}

export interface ModelInsertUsuarioRelations {
  // describe navigational properties here
}

export type ModelInsertUsuarioWithRelations = ModelInsertUsuario & ModelInsertUsuarioRelations;
