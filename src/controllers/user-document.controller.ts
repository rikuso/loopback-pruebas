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
import {UserDocument} from '../models';
import {UserDocumentRepository} from '../repositories';

export class UserDocumentController {
  constructor(
    @repository(UserDocumentRepository)
    public userDocumentRepository : UserDocumentRepository,
  ) {}

  @post('/user-documents')
  @response(200, {
    description: 'UserDocument model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserDocument)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocument, {
            title: 'NewUserDocument',
            exclude: ['id'],
          }),
        },
      },
    })
    userDocument: Omit<UserDocument, 'id'>,
  ): Promise<UserDocument> {
    return this.userDocumentRepository.create(userDocument);
  }

  @get('/user-documents/count')
  @response(200, {
    description: 'UserDocument model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserDocument) where?: Where<UserDocument>,
  ): Promise<Count> {
    return this.userDocumentRepository.count(where);
  }

  @get('/user-documents')
  @response(200, {
    description: 'Array of UserDocument model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserDocument, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserDocument) filter?: Filter<UserDocument>,
  ): Promise<UserDocument[]> {
    return this.userDocumentRepository.find(filter);
  }

  @patch('/user-documents')
  @response(200, {
    description: 'UserDocument PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocument, {partial: true}),
        },
      },
    })
    userDocument: UserDocument,
    @param.where(UserDocument) where?: Where<UserDocument>,
  ): Promise<Count> {
    return this.userDocumentRepository.updateAll(userDocument, where);
  }

  @get('/user-documents/{id}')
  @response(200, {
    description: 'UserDocument model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserDocument, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UserDocument, {exclude: 'where'}) filter?: FilterExcludingWhere<UserDocument>
  ): Promise<UserDocument> {
    return this.userDocumentRepository.findById(id, filter);
  }

  @patch('/user-documents/{id}')
  @response(204, {
    description: 'UserDocument PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserDocument, {partial: true}),
        },
      },
    })
    userDocument: UserDocument,
  ): Promise<void> {
    await this.userDocumentRepository.updateById(id, userDocument);
  }

  @put('/user-documents/{id}')
  @response(204, {
    description: 'UserDocument PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userDocument: UserDocument,
  ): Promise<void> {
    await this.userDocumentRepository.replaceById(id, userDocument);
  }

  @del('/user-documents/{id}')
  @response(204, {
    description: 'UserDocument DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userDocumentRepository.deleteById(id);
  }
}
