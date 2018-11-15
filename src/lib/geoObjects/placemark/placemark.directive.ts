import { Directive, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MarkerService } from '../../services/marker.service';
import { YaMarker } from '../../models/ya-marker';
import { isNullOrUndefined } from 'util';

@Directive({
  selector: 'ya-placemark'
})
export class PlacemarkDirective implements OnInit, OnChanges, OnDestroy {

  private _marker: YaMarker;

  @Input() identifier: any;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() options: any;
  @Input() properties: any;

  constructor(private _markerService: MarkerService) { }

  ngOnInit(): void {
    this._markerService.addMarker(this.identifier, this.latitude, this.longitude, this.options, this.properties)
      .then(marker => this._marker = marker);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes.latitude) && !changes.latitude.isFirstChange() && !isNullOrUndefined(this._marker)) {
      this._marker.geometry.setCoordinates([changes.latitude.currentValue, this.longitude]);
    }

    if (!isNullOrUndefined(changes.longitude) && !changes.longitude.isFirstChange() && !isNullOrUndefined(this._marker)) {
      this._marker.geometry.setCoordinates([this.latitude, changes.longitude.currentValue]);
    }
  }

  ngOnDestroy(): void {
    this._markerService.removeMarker(this._marker);
  }
}
