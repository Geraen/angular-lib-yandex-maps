import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { YaMapWrapper } from '../services/ya-map.wrapper';
import { YaMap } from '../models/ya-map';
import { Subscription } from 'rxjs';
import { MyEvent } from '../models/my-event';
import { YaControls } from '../core/ya-controls.enum';


@Component({
  selector: 'ya-map',
  templateUrl: './ya-map.component.html',
  styleUrls: ['./ya-map.component.scss']
})
export class YaMapComponent implements OnInit, OnDestroy {

  @Input() center: number[];
  @Input() zoom: number;
  @Input() controls: YaControls[];

  @Output() loaded: EventEmitter<YaMap>;
  @Output() loadError: EventEmitter<any>;
  @Output() actiontick: EventEmitter<any>;

  private _subEvents: Subscription[];
  private _events: MyEvent[];

  constructor(private _elementRef: ElementRef, private _wrapper: YaMapWrapper) {
    this.center = [];
    this.zoom = 8;

    this._events = [];
    this._subEvents = [];

    this.loaded = new EventEmitter(false);
    this.loadError = new EventEmitter(false);
    this.actiontick = new EventEmitter(false);

    this._events = [
      { name: 'actiontick', emitter: this.actiontick }
    ];
  }

  ngOnInit() {    
    const mapContainer = this._elementRef.nativeElement.querySelector('.ya-map-container');
    this._wrapper.createMap(mapContainer, {
      center: this.center,
      zoom: this.zoom,
      type: 'yandex#map',
      controls: this.controls
    }).then(result => this.onLoaded(result))
      .catch(reason => this.loadError.emit(reason));
  }

  ngOnDestroy(): void {
    // Уничтожаем все подписи
    this._subEvents.forEach(event => event.unsubscribe());
  }

  private onLoaded(map: YaMap): void {

    // Подписываемся на события
    this._events.forEach((event: MyEvent) => {
      const subscription = this._wrapper.subscribeToMapEvent<any>(event.name)
        .subscribe((result: any) => event.emitter.emit(result));
      this._subEvents.push(subscription);
    });

    // Отправляем информацию о загрузке карты
    this.loaded.emit(map);
  }
}
