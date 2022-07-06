import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {AppUser, CredencialesCambioClave, Notificaciones} from '../models';
import {AppUserRepository} from '../repositories';
import {
  AdministradorDeClavesServiceService,
  NotificacionesServiceService,
} from '../services';
@authenticate('Estudiante', 'Administrador')
export class UserController {
  constructor(
    @repository(AppUserRepository)
    public appUserRepository: AppUserRepository,
    @service(AdministradorDeClavesServiceService)
    public servicioClaves: AdministradorDeClavesServiceService,
    @service(NotificacionesServiceService)
    public serviciosNotificaciones: NotificacionesServiceService,
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
    //const clave = this.servicioClaves.GenerarClave();

    const notificacion = new Notificaciones();
    notificacion.destinatario = appUser.email;
    notificacion.asunto = 'registro en el sistema';
    notificacion.mensaje = `Hola ${appUser.Name}<br/> su clave de acceso al sistema es : ${appUser.password} y su usuario es el correo electronico`;
    this.serviciosNotificaciones.enviarCorreo(notificacion);
    /*hasta esta parte es el bloque */
    const claveCifrada = this.servicioClaves.Cifrar(appUser.password);

    appUser.password = claveCifrada;
    return this.appUserRepository.create(appUser);
  }

  @get('/app-users/count')
  @response(200, {
    description: 'AppUser model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(AppUser) where?: Where<AppUser>): Promise<Count> {
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
    @param.filter(AppUser, {exclude: 'where'})
    filter?: FilterExcludingWhere<AppUser>,
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
  /*SEGURIDAD */
  @post('/cambiar-clave', {
    responses: {
      '200': {
        description: 'cambiar clave',
      },
    },
  })
  async cambiarClave(
    @requestBody() datos: CredencialesCambioClave,
  ): Promise<Boolean> {
    const usuario = await this.appUserRepository.findById(datos.id);
    if (usuario) {
      if (usuario.password == datos.clave_actual) {
        usuario.password = datos.nueva_clave;
        console.log(datos.nueva_clave);
        await this.appUserRepository.updateById(datos.id, usuario);
        /*siste de enviar al correo*/
        /*desde el frond vien cifrada la clave*/
        const notificacion = new Notificaciones();
        notificacion.destinatario = usuario.email;
        notificacion.asunto = 'cambio de clave';
        notificacion.mensaje = `Hola ${usuario.Name}<br/> se modificado su contraseña en el sistema`;
        this.serviciosNotificaciones.enviarCorreo(notificacion);
        /*hasta esta parte es el bloque */
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
