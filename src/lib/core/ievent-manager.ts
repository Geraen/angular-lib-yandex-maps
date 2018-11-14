import { IEvent } from "./ievent";

/**
 * Менеджер событий. 
 * При помощи менеджера событий можно подписываться на события 
 * и отписываться от них, а также инициировать сами события
 */
export interface IEventManager {

    /**
     * Добавляет новую подписку
     * @param types Тип события или массив типов
     * @param callback Функция-обработчик события. 
     * В качестве параметра в функцию передается объект, 
     * описывающий событие. Может быть либо произвольным объектом, 
     * либо реализовывать интерфейс IEvent
     * @param context Контекст исполнения обработчика
     * @param priority Приоритет подписки
     * @returns Возвращает ссылку на себя
     */
    add(types: string | string[], callback: Function | IEvent,
        context: any, priority: number): IEventManager;


    /**
     * Инициирует событие
     * @param type Тип события
     * @param event Событие. Если передан хэш с данными, 
     * то для него будет вызван метод createEventObject, 
     * и дальнейшие действия будут производиться с новым созданным событием
     * @returns Возвращает ссылку на себя
     */
    fire(type: string, event: any | IEvent): IEventManager;

    /**
     * @returns Возвращает ссылку на родительский менеджер событий
     */
    getParent(): IEventManager;

    group();
}
