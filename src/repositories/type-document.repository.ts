import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TypeDocument, TypeDocumentRelations} from '../models';

export class TypeDocumentRepository extends DefaultCrudRepository<
  TypeDocument,
  typeof TypeDocument.prototype.id,
  TypeDocumentRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(TypeDocument, dataSource);
  }
}
