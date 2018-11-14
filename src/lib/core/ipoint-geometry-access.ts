/** Интерфейс доступа к геометрии "Точка" */
export interface IPointGeometryAccess {

    /** 
     * Возвращает координаты точки
     * @returns Возвращает координаты точки
     */
    getCoordinates(): number[] | null;

    /**
     * Задает координаты точки
     * @param coordinates Задает координаты точки
     * @returns Возвращает ссылку на себя
     */
    setCoordinates(coordinates: number[] | null): IPointGeometryAccess;

}
