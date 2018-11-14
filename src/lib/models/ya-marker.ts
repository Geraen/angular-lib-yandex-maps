import { YaMap } from "./ya-map";

export interface YaMarker {
    id: any;
    events: any;
    balloon: any;
    layoutBalloon: any;
    geometry: any;
    properties: any;
    balloonContentHeader: string;
    balloonContentBody: string;
    balloonContentFooter: string;
    draggable: boolean;
    iconLayout: any;
    iconImageHref: any;
    iconImageSize: any;
    iconImageOffset: any;
    setMap(map: YaMap): void;
    setCoordinates(coordinates: number[]): void;
}
