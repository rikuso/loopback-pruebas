import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Configuraciones as config} from '../configuraciones/configuraciones';
const fetch = require('node-fetch');
export class EstrategiaAdministrador implements AuthenticationStrategy {
  name = 'Administrador';

  constructor() {}

  async authenticate(req: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(req);
    if (token) {
      const rol_admin = config.rol_administrador;
      const url = `${config.url_valirar_toke}?token=${token}&rol=${config.rol_administrador}`;
      let r = '';
      await fetch(url).then(async (res: any) => {
        r = await res.text();
      });
      switch (r) {
        case 'ok':
          const perfil: UserProfile = Object.assign({
            admin: 'ok',
          });
          return perfil;
          break;
        case 'ko':
          throw new HttpErrors[401]('el rol de token no es valido token');
        case '':
          throw new HttpErrors[401]('el token no es valido');
      }
    } else {
      throw new HttpErrors[401]('missing token');
    }
  }
}
