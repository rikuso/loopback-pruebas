import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Configuraciones} from '../configuraciones/configuraciones';
import {Notificaciones} from '../models';
const fetch = require('node-fetch');
@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesServiceService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  async enviarCorreo(notificacion: Notificaciones): Promise<Boolean> {
    const url = `${Configuraciones.url_notificaciones}?hash=${Configuraciones.has_admin}&correo_destino=${notificacion.destinatario}&asunto=${notificacion.asunto}&mensaje=${notificacion.mensaje}`;
    fetch(url).then((data: any) => {
      return true;
    });
    //const data = await response.json();
    return false;
  }
}
