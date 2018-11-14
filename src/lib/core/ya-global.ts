import { InjectionToken, Provider } from "@angular/core";
import { AngularLibYandexMapsConfigInterface } from "./angular-lib-yandex-maps-config.interface";
import { YaLang } from "./ya-lang.enum";

export const YA_APP_CONFIGS = new InjectionToken<AngularLibYandexMapsConfigInterface>('YA_APP_CONFIGS');
export const YA_LANG = new InjectionToken<YaLang>('YA_LANG');
export const YA_API_KEY = new InjectionToken<string>('YA_API_KEY');
export const YA_MAP_VERSION = new InjectionToken<string>('YA_MAP_VERSION');

export class DocumentRef {

    public getNativeDocument(): any {
        return document;
    }

}

export const BROWSER_GLOBALS_PROVIDERS: Provider[] = [DocumentRef];