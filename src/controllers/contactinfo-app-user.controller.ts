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
  AppUser,
} from '../models';
import {ContactinfoRepository} from '../repositories';

export class ContactinfoAppUserController {
  constructor(
    @repository(ContactinfoRepository)
    public contactinfoRepository: ContactinfoRepository,
  ) { }

  @get('/contactinfos/{id}/app-user', {
    responses: {
      '200': {
        description: 'AppUser belonging to Contactinfo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AppUser)},
          },
        },
      },
    },
  })
  async getAppUser(
    @param.path.number('id') id: typeof Contactinfo.prototype.id,
  ): Promise<AppUser> {
    return this.contactinfoRepository.appUser(id);
  }
}
