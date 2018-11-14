import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularLibYandexMapsConfigInterface } from './core/angular-lib-yandex-maps-config.interface';
import { YaLang } from './core/ya-lang.enum';
import { YA_APP_CONFIGS, YA_LANG, YA_API_KEY, YA_MAP_VERSION, BROWSER_GLOBALS_PROVIDERS } from './core/ya-global';
import { LoaderService } from './services/loader.service';
import { YaMapComponent } from './ya-map/ya-map.component';
import { YaMapWrapper } from './services/ya-map.wrapper';
import { MarkerService } from './services/marker.service';
import { CustomPlacemarkComponent } from './geoObjects/custom-placemark/custom-placemark.component';
import { CustomPlacemarkDirective } from './geoObjects/custom-placemark.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [YaMapComponent, CustomPlacemarkComponent, CustomPlacemarkDirective],
  exports: [YaMapComponent, CustomPlacemarkComponent, CustomPlacemarkDirective],
  providers: [YaMapWrapper, MarkerService]
})
export class AngularLibYandexMapsModule {

  public static forRoot(apiKey: string, lang: YaLang = YaLang.ruRU, 
    version: string = '2.1', yaMapsConfig: AngularLibYandexMapsConfigInterface = null): ModuleWithProviders {

    return {
      ngModule: AngularLibYandexMapsModule,
      providers: [
        ...BROWSER_GLOBALS_PROVIDERS,
        { provide: LoaderService, useClass: LoaderService },
        { provide: YA_APP_CONFIGS, useValue: yaMapsConfig },
        { provide: YA_LANG, useValue: lang },
        { provide: YA_API_KEY, useValue: apiKey },
        { provide: YA_MAP_VERSION, useValue: version },
      ]
    };
  }

}
