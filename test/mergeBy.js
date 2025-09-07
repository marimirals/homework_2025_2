'use strict';

QUnit.module("Тестируем функцию mergeBy", function() {
    QUnit.test("Работает правильно с одинаковыми значениями по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Работает правильно с отсутствующими ключами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", age: 25 }
        ]);
    });

    QUnit.test("Обрабатывает пустые массивы", function(assert) {
        const result1 = mergeBy([], [], "id");
        assert.deepEqual(result1, []);
        
        const array1 = [{ id: 1, name: "Alice" }];
        const result2 = mergeBy(array1, [], "id");
        assert.deepEqual(result2, array1);
        
        const result3 = mergeBy([], array1, "id");
        assert.deepEqual(result3, array1);
    });

    QUnit.test("Обрабатывает вложенные массивы и разные типы данных", function(assert) {
        const array1 = [
            { id: 1, tags: ["a", "b"], data: { nested: "value" } }
        ];
        const array2 = [
            { id: 1, tags: ["b", "c"], data: { nested: "newValue" } }
        ];
        const result = mergeBy(array1, array2, "id");
        
        assert.deepEqual(result, [
            { id: 1, tags: ["a", "b", "c"], data: { nested: "newValue" } }
        ]);
    });

    QUnit.test("Работает с различными типами ключей", function(assert) {
        const array1 = [
            { key: "user1", name: "Alice" },
            { key: 123, value: "number" }
        ];
        const array2 = [
            { key: "user1", age: 30 },
            { key: 123, extra: "data" }
        ];
        const result = mergeBy(array1, array2, "key");
        
        assert.deepEqual(result, [
            { key: "user1", name: "Alice", age: 30 },
            { key: 123, value: "number", extra: "data" }
        ]);
    });

});
