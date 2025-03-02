import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertUsuarioReferido extends Model {
  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'number',
    required: true,
  })
  Whatsapp: number;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Num_documento: string;

  @property({
    type: 'number',
    required: true,
  })
  Id_Ciudad: number;

  @property({
    type: 'number',
    required: true,
  })
  Id_Referido: number;


  constructor(data?: Partial<ModelInsertUsuarioReferido>) {
    super(data);
  }
}

export interface ModelInsertUsuarioReferidoRelations {
  // describe navigational properties here
}

export type ModelInsertUsuarioReferidoWithRelations = ModelInsertUsuarioReferido & ModelInsertUsuarioReferidoRelations;
