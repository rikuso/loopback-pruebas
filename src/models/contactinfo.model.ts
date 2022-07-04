import {belongsTo, Entity, model, property} from '@loopback/repository';
import {AppUser} from './app-user.model';
import {Country} from './country.model';

@model({
  settings: {
    foreignKeys: {
      fk_user_id: {
        name: 'fk_user_id',
        entity: 'AppUser',
        entityKey: 'id',
        foreignKey: 'appUserId',
      },
      fk_country_id: {
        name: 'fk_country_id',
        entity: 'Country',
        entityKey: 'id',
        foreignKey: 'countryId',
      },
    },
  },
})
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

  @belongsTo(() => Country)
  countryId: number;

  @belongsTo(() => AppUser)
  appUserId: number;

  constructor(data?: Partial<Contactinfo>) {
    super(data);
  }
}

export interface ContactinfoRelations {
  // describe navigational properties here
}

export type ContactinfoWithRelations = Contactinfo & ContactinfoRelations;
