import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Contactinfo, ContactinfoRelations, Country, AppUser} from '../models';
import {CountryRepository} from './country.repository';
import {AppUserRepository} from './app-user.repository';

export class ContactinfoRepository extends DefaultCrudRepository<
  Contactinfo,
  typeof Contactinfo.prototype.id,
  ContactinfoRelations
> {

  public readonly country: BelongsToAccessor<Country, typeof Contactinfo.prototype.id>;

  public readonly appUser: BelongsToAccessor<AppUser, typeof Contactinfo.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>, @repository.getter('AppUserRepository') protected appUserRepositoryGetter: Getter<AppUserRepository>,
  ) {
    super(Contactinfo, dataSource);
    this.appUser = this.createBelongsToAccessorFor('appUser', appUserRepositoryGetter,);
    this.registerInclusionResolver('appUser', this.appUser.inclusionResolver);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
    this.registerInclusionResolver('country', this.country.inclusionResolver);
  }
}
