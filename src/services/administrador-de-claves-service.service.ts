import {/* inject, */ BindingScope, injectable} from '@loopback/core';
const generatePassword = require('password-generator');
const CryptoJS = require('crypto-js');
@injectable({scope: BindingScope.TRANSIENT})
export class AdministradorDeClavesServiceService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  GenerarClave() {
    const claveAleatoria = generatePassword(8, false);
    return claveAleatoria;
  }

  Cifrar(text: string) {
    const textoCifrado = CryptoJS.MD5(text).toString();
    return textoCifrado;
  }
}
