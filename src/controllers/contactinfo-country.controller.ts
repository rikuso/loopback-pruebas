import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Contactinfo,
  Country,
} from '../models';
import {ContactinfoRepository} from '../repositories';

export class ContactinfoCountryController {
  constructor(
    @repository(ContactinfoRepository)
    public contactinfoRepository: ContactinfoRepository,
  ) { }

  @get('/contactinfos/{id}/country', {
    responses: {
      '200': {
        description: 'Country belonging to Contactinfo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Country)},
          },
        },
      },
    },
  })
  async getCountry(
    @param.path.number('id') id: typeof Contactinfo.prototype.id,
  ): Promise<Country> {
    return this.contactinfoRepository.country(id);
  }
}
