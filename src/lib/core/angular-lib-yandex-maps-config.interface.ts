import { YaCoordOrder } from "./ya-coord-order.enum";
import { YaModule } from "./ya-module.enum";
import { YaMode } from "./ya-mode.enum";

export interface AngularLibYandexMapsConfigInterface {

    /** Порядок задания географических координат при работе API */
    coordorder: YaCoordOrder;

    /** Список загружаемых модулей */
    load: YaModule[];

    /** Режим загрузки API */
    mode: YaMode;

    /** Включает режим использования CSP. Может принимать значение true */
    csp: boolean;

    /**
     * Пространство имен, в котором локализованы программные компоненты API
     * По умолчанию все объекты принадлежат пространству имен ymaps
     */
    ns: string;

    // Платная версия API
    isEnterprise: boolean;

    /** Имя функции, которую необходимо вызвать после того, как компоненты API будут загружены и готовы к использованию */
    // onload: Function; todo

    /** Имя callback-функции, которая будет вызвана в случае ошибки загрузки API. */
    // onerror: Function; todo
}
