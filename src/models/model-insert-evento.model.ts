import {Model, model, property} from '@loopback/repository';

@model()
export class ModelInsertEvento extends Model {
  @property({
    type: 'string',
    required: true,
  })
  nombre_evento: string;

  @property({
    type: 'string',
    required: true,
  })
  lugar_evento: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_inicio: string;

  @property({
    type: 'number',
    required: true,
  })
  ciudad_id: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_fin: string;


  constructor(data?: Partial<ModelInsertEvento>) {
    super(data);
  }
}

export interface ModelInsertEventoRelations {
  // describe navigational properties here
}

export type ModelInsertEventoWithRelations = ModelInsertEvento & ModelInsertEventoRelations;
