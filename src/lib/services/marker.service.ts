import { Injectable } from '@angular/core';
import { YaMapWrapper } from './ya-map.wrapper';
import { YaMarker } from '../models/ya-marker';

@Injectable()
export class MarkerService {
  
  private markers: YaMarker[] = [];

  constructor(private _wrapper: YaMapWrapper) { }

  public addTemplateMarker(identifier: any, template: string, latitude: number, longitude: number, options: any, properties: any): Promise<YaMarker> {
    return this._wrapper.createTemplateMarker(template, latitude, longitude, options, properties).then(marker => this.pushMarker(identifier, marker));
  }

  public addMarker(identifier: any, latitude: number, longitude: number, options: any = null, properties: any = null): Promise<YaMarker> {
    return this._wrapper.createMarker(latitude, longitude, options, properties).then(marker => this.pushMarker(identifier, marker));
  }

  public getMarker(markerId: number): YaMarker {
    return this.markers.find(m => m.id === markerId);
  }

  public removeMarker(_marker: YaMarker): Promise<void> {
    return this._wrapper.removeMarker(_marker).then(() => {
      const index = this.markers.indexOf(_marker);
      if (index !== -1) { this.markers.splice(index, 1); }
    });
  }

  private pushMarker(identifier: any, marker: YaMarker): YaMarker {
    marker.id = identifier;
    this.markers.push(marker);
    return marker;
  }
}
