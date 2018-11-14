import { Injectable } from '@angular/core';
import { YaMapWrapper } from './ya-map.wrapper';
import { YaMarker } from '../models/ya-marker';

@Injectable()
export class MarkerService {

  private markers: YaMarker[] = [];

  constructor(private _wrapper: YaMapWrapper) { }

  public addTemplateMarker(identifier: any, template: string, latitude: number, longitude: number, options: any, properties: any): Promise<YaMarker> {
    return this._wrapper.createTemplateMarker(template, latitude, longitude, options, properties).then(marker => {
      marker.id = identifier;
      this.markers.push(marker);
      return marker;
    });
  }

  public getMarker(markerId: number): YaMarker {
    return this.markers.find(m => m.id === markerId);
  }
}
