# Angular Yandex Map
Добавляет на страницу яндекс карты. На данные момент можно добавить только пользовательский маркер. Скоро появится остальные возможность работы с картами

#### Install
```bash 
npm i angular-lib-yandex-maps
```

#### app.module.ts
```ts
AngularLibYandexMapsModule.forRoot('Ваш ключю или null')
```

Style.css
```css
.ya-map-container {
   width: 300px;
   height: 200px;
}
```

Пример карт
```html
<ya-map [center]="[56.484680, 84.948197]" [zoom]="10" 
    (loaded)="onMapLoaded($event)" (loadError)="onMapErrorLoaded($event)" 
    (actiontick)="onActiontick($event)">
</ya-map>
```

Пример карт с пользовательским маркером
```html
<ya-map [center]="[56.484680, 84.948197]" [zoom]="10" 
    (loaded)="onMapLoaded($event)" (loadError)="onMapErrorLoaded($event)" 
    (actiontick)="onActiontick($event)">
        <ya-custom-placemark [identifier]="marker.identifier" [latitude]="marker.latitude" [longitude]="marker.longitude" 
        [options]="marker.options" [properties]="marker.properties">
        <div style="display: $[properties.isShowName];">$[properties.carName]</div>
        <div style="position: relative; width: 49px; height: 49px;">
            <div style="position: absolute; left: 0; right: 0; margin: auto; width: 15px; z-index: 1; top: 0; bottom: 0; height: 15px">$[properties.way]</div>
            <img src="your-image.jpg" style="transform: rotate($[properties.rotation]deg);">
        </div>
    </ya-custom-placemark>
</ya-map>
```
```ts
marker: {
    identifier: 'identifier',
    latitude: 56.484680,
    longitude: 84.948197,
    options: {
    isShowName: 'none',
    carName: "name",
    hintContent: 'Метка с прямоугольным HTML макетом',
    way: '01',
    rotation: 0
    },
    properties: {
    iconShape: {
        type: 'Rectangle',
        coordinates: [
        [0, 0], [1, 1]
        ]
    },
    iconOffset: [1, 1]
    }
};
```