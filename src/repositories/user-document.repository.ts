import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UserDocument, UserDocumentRelations, TypeDocument, AppUser} from '../models';
import {TypeDocumentRepository} from './type-document.repository';
import {AppUserRepository} from './app-user.repository';

export class UserDocumentRepository extends DefaultCrudRepository<
  UserDocument,
  typeof UserDocument.prototype.id,
  UserDocumentRelations
> {

  public readonly typeDocument: BelongsToAccessor<TypeDocument, typeof UserDocument.prototype.id>;

  public readonly appUser: BelongsToAccessor<AppUser, typeof UserDocument.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TypeDocumentRepository') protected typeDocumentRepositoryGetter: Getter<TypeDocumentRepository>, @repository.getter('AppUserRepository') protected appUserRepositoryGetter: Getter<AppUserRepository>,
  ) {
    super(UserDocument, dataSource);
    this.appUser = this.createBelongsToAccessorFor('appUser', appUserRepositoryGetter,);
    this.registerInclusionResolver('appUser', this.appUser.inclusionResolver);
    this.typeDocument = this.createBelongsToAccessorFor('typeDocument', typeDocumentRepositoryGetter,);
    this.registerInclusionResolver('typeDocument', this.typeDocument.inclusionResolver);
  }
}
