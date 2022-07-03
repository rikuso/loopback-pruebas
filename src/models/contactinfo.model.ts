import {Entity, model, property} from '@loopback/repository';

@model()
export class Contactinfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Address: string;

  @property({
    type: 'string',
    required: true,
  })
  City: string;

  @property({
    type: 'string',
    required: true,
  })
  Phone: string;

  @property({
    type: 'string',
    required: true,
  })
  CelPhone: string;

  @property({
    type: 'string',
    required: true,
  })
  EmergencyName: string;

  @property({
    type: 'string',
    required: true,
  })
  EmergencyPhone: string;


  constructor(data?: Partial<Contactinfo>) {
    super(data);
  }
}

export interface ContactinfoRelations {
  // describe navigational properties here
}

export type ContactinfoWithRelations = Contactinfo & ContactinfoRelations;
