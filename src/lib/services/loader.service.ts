import { Injectable, Injector } from '@angular/core';
import { AngularLibYandexMapsConfigInterface } from '../core/angular-lib-yandex-maps-config.interface';
import { YA_APP_CONFIGS, YA_API_KEY, YA_LANG, YA_MAP_VERSION, DocumentRef } from '../core/ya-global';
import { YaLang } from '../core/ya-lang.enum';
import { isNullOrUndefined } from 'util';

@Injectable()
export class LoaderService {

  private _scriptLoadingPromise: Promise<void>;
  private _yaAppConfig: AngularLibYandexMapsConfigInterface;
  private _yaApiKey: string;
  private _lang: string;
  private _version: string;

  constructor(private _injector: Injector, private _documentRef: DocumentRef) {
    this._yaAppConfig = _injector.get<AngularLibYandexMapsConfigInterface>(YA_APP_CONFIGS);
    this._yaApiKey = _injector.get<string>(YA_API_KEY);
    this._lang = _injector.get<YaLang>(YA_LANG);
    this._version = _injector.get<string>(YA_MAP_VERSION);
  }

  /** Загружает скрипт Яндекс карт */
  public load(): Promise<void> {

    let subDomen = 'api-maps';
    if (!isNullOrUndefined(this._yaAppConfig) && this._yaAppConfig.isEnterprise) {
      subDomen = 'enterprise';
    }

    let apiKey = '';
    if (!isNullOrUndefined(this._yaApiKey)) {
      apiKey = `${this._yaApiKey}&`;
    }

    const additionParameters = this.generateAdditionParameter();
    const link = `https://${subDomen}.yandex.ru/${this._version}?${apiKey}lang=${this._lang}${additionParameters}`;

    const script = this._documentRef.getNativeDocument().createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.defer = true;
    script.id = 'YaScript';
    script.src = link;

    this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
      /** Здесь происходят действия загрзки или не загрузки скрипта */
      // todo Попытаться использовать параметры onload и onerror в link
      // чтобы быть уверенным, что скрипт готов или знать точную инфу об ошибке
      script.onload = () => { resolve(); };
      script.onerror = (error: Event) => { reject(error); }; 
    });
    this._documentRef.getNativeDocument().body.appendChild(script);
    return this._scriptLoadingPromise;
  }

  /** Генерирует строку с дополнительными параметрами */
  private generateAdditionParameter(): string {
    let result: string[] = [];

    if (!isNullOrUndefined(this._yaAppConfig) && !isNullOrUndefined(this._yaAppConfig.coordorder)) {
      result.push(`coordorder=${this._yaAppConfig.coordorder}`);
    }

    if (!isNullOrUndefined(this._yaAppConfig) && !isNullOrUndefined(this._yaAppConfig.load) && this._yaAppConfig.load.length > 0) {
      result.push(`load=${this._yaAppConfig.load.join(',')}`);
    }

    if (!isNullOrUndefined(this._yaAppConfig) && !isNullOrUndefined(this._yaAppConfig.mode)) {
      result.push(`mode=${this._yaAppConfig.mode}`);
    }

    if (!isNullOrUndefined(this._yaAppConfig) && !isNullOrUndefined(this._yaAppConfig.csp)) {
      result.push(`csp=${this._yaAppConfig.csp}`);
    }

    if (!isNullOrUndefined(this._yaAppConfig) && !isNullOrUndefined(this._yaAppConfig.ns)) {
      result.push(`ns=${this._yaAppConfig.ns}`);
    }


    if (result.length > 0) return `&${result.join('&')}`;
    return '';
  }
}
