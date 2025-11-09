/* 
Author: Zankat Kalpesh
Email: zankatkalpesh@gmail.com
*/
import { JSEncrypt } from 'jsencrypt';
import { REACT_APP_JSENCRYPT_PRIV_KEY, REACT_APP_JSENCRYPT_PUB_KEY } from './appConfig';

const JsencryptService = (function () {

  let _PUB_KEY = REACT_APP_JSENCRYPT_PUB_KEY || '';
  let _PRIV_KEY = REACT_APP_JSENCRYPT_PRIV_KEY || '';

  class JsencryptService {

    private pubKey: string;
    private privKey: string;

    constructor(pubKey = null, privKey = null) {
      this.pubKey = (pubKey !== null) ? pubKey : _PUB_KEY;
      this.privKey = (privKey !== null) ? privKey : _PRIV_KEY;
    }

    get getPubKey(): string {
      return this.pubKey;
    }

    get getPrivKey(): string {
      return this.privKey;
    }

    encrypt(data: any): string | any {
      if (data === undefined || data === null) { return data; }

      if (typeof data === 'object') {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            data[key] = this.encrypt(data[key]);
          }
        }
        return data;
      }

      const encrypt = new JSEncrypt({});
      encrypt.setPublicKey(this.pubKey);
      let encrypted = encrypt.encrypt(data);
      return encrypted;
    }

    decrypt(data: any): string | any {
      if (data === undefined || data === null) { return data; }
      
      if (typeof data === 'object') {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            data[key] = this.decrypt(data[key]);
          }
        }
        return data;
      }
      
      const decrypt = new JSEncrypt({});
      decrypt.setPrivateKey(this.privKey);
      const uncrypted = decrypt.decrypt(data);
      return uncrypted;
    }

  }

  return JsencryptService;
})();

export const Jsencrypt = new JsencryptService();

export default JsencryptService;
