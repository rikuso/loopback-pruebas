import {belongsTo, Entity, model, property} from '@loopback/repository';
import {AppUser} from './app-user.model';
import {TypeDocument} from './type-document.model';

@model({
  settings: {
    foreignKeys: {
      fk_user_document_id: {
        name: 'fk_user_document_id',
        entity: 'AppUser',
        entityKey: 'id',
        foreignKey: 'appUserId',
      },
      fk_type_user_id: {
        name: 'fk_type_user_id',
        entity: 'TypeDocument',
        entityKey: 'id',
        foreignKey: 'typeDocumentId',
      },
    },
  },
})
export class UserDocument extends Entity {
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
  Document: string;

  @property({
    type: 'string',
    required: true,
  })
  PlaceExpedition: string;

  @property({
    type: 'date',
    required: true,
  })
  DateExpedition: string;

  @belongsTo(() => TypeDocument)
  typeDocumentId: number;

  @belongsTo(() => AppUser)
  appUserId: number;

  constructor(data?: Partial<UserDocument>) {
    super(data);
  }
}

export interface UserDocumentRelations {
  // describe navigational properties here
}

export type UserDocumentWithRelations = UserDocument & UserDocumentRelations;
