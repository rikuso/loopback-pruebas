import {Entity, model, property} from '@loopback/repository';

@model()
export class AppUser extends Entity {
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
  LastName: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'boolean',
    default: true,
  })
  IsMilitar?: boolean;

  @property({
    type: 'date',
    required: true,
  })
  TimeCreate: string;

  @property({
    type: 'boolean',
    default: true,
  })
  isTemporal?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  emailVerified: string;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  verificationToken: boolean;

  constructor(data?: Partial<AppUser>) {
    super(data);
  }
}

export interface AppUserRelations {
  // describe navigational properties here
}

export type AppUserWithRelations = AppUser & AppUserRelations;
