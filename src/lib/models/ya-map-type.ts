/** Тип карты */
export class YaMapType {

    /**
     * Конструтор
     * @param name Название типа
     * @param layers Массив, содержащий конструкторы слоев или ключи
     */
    constructor(
        public name: string,
        public layers: Function[] | string[]
        ) {
    }

    // getLayers(): Function[] | string[];
}
