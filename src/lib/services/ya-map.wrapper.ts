import { Injectable, NgZone } from '@angular/core';
import { LoaderService } from './loader.service';
import { YaMap } from '../models/ya-map';
import { YaMapOptions } from '../models/ya-map-options';
import { YaMarker } from '../models/ya-marker';
import { Observable, Observer } from 'rxjs';

declare var ymaps: any;

@Injectable()
export class YaMapWrapper {
  private _map: Promise<YaMap>;
  private _mapResolver: (value?: YaMap) => void;

  constructor(private _loader: LoaderService, private _zone: NgZone) {
    this._map = new Promise<YaMap>((resolve: () => void) => {
      this._mapResolver = resolve;
    });
  }

  /**
   * Создает карту в выделенной области
   * @param element Контейнер, куда надо пометить карту
   * @param options Начальные настроки карты
   */
  public createMap(element: HTMLElement, options: YaMapOptions): Promise<YaMap> {
    return this._loader.load()
      .then(() => new Promise<YaMap>((resolve, reject) => {
        ymaps.ready(() => {
          let map = new ymaps.Map(element, options);
          this._mapResolver(map as YaMap);
          if (!map) reject('Не создалась карта. ХЗ почему');
          else resolve(map);
        });
      }));
  }

  /**
   * Координаты центра карты
   * @param latitude 
   * @param longitude 
   */
  public setSenter(latitude: number, longitude: number): void {
    this._map.then((map: YaMap) => {
      map.setCenter([latitude, longitude]);
    });
  }

  /**
   * Создает пользовательский маркер на карте
   * @param template Шаблон маркера
   * @param latitude
   * @param longitude
   * @param options @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#Placemark__param-options
   * @param properties @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#Placemark__param-properties
   */
  public createTemplateMarker(template: string, latitude: number, longitude: number, options: any, properties: any): Promise<YaMarker> {
    return this._map.then((map: YaMap) => this.createMarker(latitude, longitude, options, {
      iconLayout: ymaps.templateLayoutFactory.createClass(template),
      iconShape: properties.iconShape,
      iconOffset: properties.iconOffset
    }));
  }
  /**
   * Создает маркер на карте
   * @param latitude 
   * @param longitude 
   * @param options @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#Placemark__param-options
   * @param properties @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/#Placemark__param-properties
   */
  public createMarker(latitude: number, longitude: number, options: any = null, properties: any = null): Promise<YaMarker> {
    return this._map.then((map: YaMap) => {
      let marker = new ymaps.Placemark([latitude, longitude], options, properties);
      map.geoObjects.add(marker);
      return marker as YaMarker;
    });
  }

  public removeMarker(_marker: YaMarker): Promise<void> {
    return this._map.then((map: YaMap) => {
      map.geoObjects.remove(_marker);
    });
  }

  public subscribeToMapEvent<TSource>(event: string): Observable<TSource> {
    return Observable.create((observer: Observer<TSource>) => {
      this._map.then((map: YaMap) => {
        map.events.add(event, (args) => {
          this._zone.run(() => observer.next(args))
        })
      });
    });
  }
}
