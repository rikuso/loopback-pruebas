import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AppUser, AppUserRelations} from '../models';

export class AppUserRepository extends DefaultCrudRepository<
  AppUser,
  typeof AppUser.prototype.id,
  AppUserRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(AppUser, dataSource);
  }
}
