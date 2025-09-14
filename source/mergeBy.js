'use strict';

/**
 * Функция, которая объединяет два массива объектов по указанному ключу.
 * @param {Array<Object>} arr1 - Первый массив объектов.
 * @param {Array<Object>} arr2 - Второй массив объектов.
 * @param {string} keyName - Ключ, по которому происходит объединение.
 * @returns {Array<Object>} - Новый массив объединенных объектов.
 */
function mergeBy(arr1, arr2, keyName) {

    const resultMap = new Map(); 

    processArray(arr1, resultMap, keyName, mergeFunc);
    processArray(arr2, resultMap, keyName, mergeFunc);
  
    return Array.from(resultMap.values());

}


/**
 * Обрабатывает массив, добавляя объекты в карту (с объединением при необходимости)
 * @param {Array<Object>} arr - Массив объектов для обработки
 * @param {Map} map - Карта для результатов
 * @param {string} keyName - Ключ для объединения
 * @param {Function} mergeFunc - Функция для объединения объектов
 */
function processArray(arr, map, keyName, mergeFunc) {

    for (const obj of arr) {
        const keyValue = obj[keyName];

        if (!keyValue) {
            continue;
        }

        if (map.has(keyValue)){
            const objInMap = map.get(keyValue);
            map.set(keyValue, mergeFunc(objInMap, obj)); 
        } else {
            map.set(keyValue, { ...obj });
        }
    }

}


/**
 * Объединяет два объекта
 * @param {Object} obj1 - Первый объект
 * @param {Object} obj2 - Второй объект
 * @returns {Object} - Новый объединенный объект
 */
function mergeFunc(obj1, obj2) {

    const newObj = { ...obj1 };

    Object.entries(obj2).forEach(([key, value]) => {
        if (Array.isArray(newObj[key]) || Array.isArray(value)) {
            const arr1 = Array.isArray(newObj[key]) ? newObj[key] : [newObj[key]];
            const arr2 = Array.isArray(value) ? value : [value];
            newObj[key] = [...new Set([...arr1, ...arr2])];
        } else {
            newObj[key] = value;
        }
    });
    
    return newObj;

}
