import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AppUser} from '../models';
import {AppUserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(AppUserRepository)
    public appUserRepository : AppUserRepository,
  ) {}

  @post('/app-users')
  @response(200, {
    description: 'AppUser model instance',
    content: {'application/json': {schema: getModelSchemaRef(AppUser)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUser, {
            title: 'NewAppUser',
            exclude: ['id'],
          }),
        },
      },
    })
    appUser: Omit<AppUser, 'id'>,
  ): Promise<AppUser> {
    return this.appUserRepository.create(appUser);
  }

  @get('/app-users/count')
  @response(200, {
    description: 'AppUser model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AppUser) where?: Where<AppUser>,
  ): Promise<Count> {
    return this.appUserRepository.count(where);
  }

  @get('/app-users')
  @response(200, {
    description: 'Array of AppUser model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AppUser, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AppUser) filter?: Filter<AppUser>,
  ): Promise<AppUser[]> {
    return this.appUserRepository.find(filter);
  }

  @patch('/app-users')
  @response(200, {
    description: 'AppUser PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUser, {partial: true}),
        },
      },
    })
    appUser: AppUser,
    @param.where(AppUser) where?: Where<AppUser>,
  ): Promise<Count> {
    return this.appUserRepository.updateAll(appUser, where);
  }

  @get('/app-users/{id}')
  @response(200, {
    description: 'AppUser model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AppUser, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AppUser, {exclude: 'where'}) filter?: FilterExcludingWhere<AppUser>
  ): Promise<AppUser> {
    return this.appUserRepository.findById(id, filter);
  }

  @patch('/app-users/{id}')
  @response(204, {
    description: 'AppUser PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppUser, {partial: true}),
        },
      },
    })
    appUser: AppUser,
  ): Promise<void> {
    await this.appUserRepository.updateById(id, appUser);
  }

  @put('/app-users/{id}')
  @response(204, {
    description: 'AppUser PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() appUser: AppUser,
  ): Promise<void> {
    await this.appUserRepository.replaceById(id, appUser);
  }

  @del('/app-users/{id}')
  @response(204, {
    description: 'AppUser DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.appUserRepository.deleteById(id);
  }
}
