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
import {Contactinfo} from '../models';
import {ContactinfoRepository} from '../repositories';

export class ContactinfoController {
  constructor(
    @repository(ContactinfoRepository)
    public contactinfoRepository : ContactinfoRepository,
  ) {}

  @post('/contactinfos')
  @response(200, {
    description: 'Contactinfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contactinfo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactinfo, {
            title: 'NewContactinfo',
            exclude: ['id'],
          }),
        },
      },
    })
    contactinfo: Omit<Contactinfo, 'id'>,
  ): Promise<Contactinfo> {
    return this.contactinfoRepository.create(contactinfo);
  }

  @get('/contactinfos/count')
  @response(200, {
    description: 'Contactinfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contactinfo) where?: Where<Contactinfo>,
  ): Promise<Count> {
    return this.contactinfoRepository.count(where);
  }

  @get('/contactinfos')
  @response(200, {
    description: 'Array of Contactinfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contactinfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contactinfo) filter?: Filter<Contactinfo>,
  ): Promise<Contactinfo[]> {
    return this.contactinfoRepository.find(filter);
  }

  @patch('/contactinfos')
  @response(200, {
    description: 'Contactinfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactinfo, {partial: true}),
        },
      },
    })
    contactinfo: Contactinfo,
    @param.where(Contactinfo) where?: Where<Contactinfo>,
  ): Promise<Count> {
    return this.contactinfoRepository.updateAll(contactinfo, where);
  }

  @get('/contactinfos/{id}')
  @response(200, {
    description: 'Contactinfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contactinfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Contactinfo, {exclude: 'where'}) filter?: FilterExcludingWhere<Contactinfo>
  ): Promise<Contactinfo> {
    return this.contactinfoRepository.findById(id, filter);
  }

  @patch('/contactinfos/{id}')
  @response(204, {
    description: 'Contactinfo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contactinfo, {partial: true}),
        },
      },
    })
    contactinfo: Contactinfo,
  ): Promise<void> {
    await this.contactinfoRepository.updateById(id, contactinfo);
  }

  @put('/contactinfos/{id}')
  @response(204, {
    description: 'Contactinfo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contactinfo: Contactinfo,
  ): Promise<void> {
    await this.contactinfoRepository.replaceById(id, contactinfo);
  }

  @del('/contactinfos/{id}')
  @response(204, {
    description: 'Contactinfo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contactinfoRepository.deleteById(id);
  }
}
