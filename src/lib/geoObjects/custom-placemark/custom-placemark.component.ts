import { Component, OnInit, Input, ViewChild, AfterContentInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, KeyValueDiffers, KeyValueDiffer, DoCheck, KeyValueChangeRecord } from '@angular/core';
import { MarkerService } from '../../services/marker.service';
import { isNullOrUndefined } from 'util';
import { YaMarker } from '../../models/ya-marker';

@Component({
  selector: 'ya-custom-placemark',
  templateUrl: './custom-placemark.component.html',
  styleUrls: ['./custom-placemark.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPlacemarkComponent implements OnInit, OnChanges, DoCheck {

  private customerDiffer: KeyValueDiffer<string, any>;
  private _marker: YaMarker;

  @ViewChild('content') private _content;

  @Input() identifier: any;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() options: any;
  @Input() properties: any;

  constructor(private _markerService: MarkerService, private differs: KeyValueDiffers) { }

  ngOnInit() {
    this.customerDiffer = this.differs.find({}).create();
    this._markerService.addTemplateMarker(this.identifier, this._content.nativeElement.innerHTML, this.latitude, this.longitude, this.options, this.properties)
      .then(marker => this._marker = marker);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.latitude.isFirstChange() && !isNullOrUndefined(this._marker)) {
      this._marker.geometry.setCoordinates([changes.latitude.currentValue, changes.longitude.currentValue]);
    }

    if (!changes.longitude.isFirstChange() && !isNullOrUndefined(this._marker)) {
      this._marker.geometry.setCoordinates([changes.latitude.currentValue, changes.longitude.currentValue]);
    }
  }

  ngDoCheck(): void {
    const changes = this.customerDiffer.diff(this.options);
    if (isNullOrUndefined(changes)) return;
    changes.forEachChangedItem((record: KeyValueChangeRecord<string, any>) => this._marker.properties.set(record.key, record.currentValue));
  }

}
