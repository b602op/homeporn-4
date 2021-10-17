// solution/index.js
import { HomeWork } from './playground';

const promiseWrapper = (callback: Function) => (...props) => (
    new Promise((resolve) => callback(...props, (result) => {
            return resolve(result);
        })
    )
);

const getReduce = (Homework: typeof HomeWork) => async (array, fn, initialValue, cb) => {
    let accumulator = initialValue;
    let index: number = 0;
    const arrLength = await promiseWrapper(array.length)((x) => x);

    if (!accumulator) {
        accumulator = await promiseWrapper(array.get)((x) => x, index);
        index = 1;
    }

    while(await promiseWrapper(Homework.less)((x) => x, index, arrLength)) {
        const item = await promiseWrapper(array.get)(index);
        accumulator = await promiseWrapper(fn)(accumulator, item, index, array);
        index = await promiseWrapper(Homework.add)(index, 1) as number;
    }


    cb(accumulator)
}

module.exports = getReduce;

/*
Пример

const asyncArray = new Homework.AsyncArray([1, 2, 3, 4])
const reducerSum = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb)

reduce(asyncArray, reducerSum, 0, (res) => {
    console.log(res) // 10
})

---------------------

Сигнатура функции

type reduce = (
    array: AsyncArray
    fn: (
        acc: any,
        cur: any,
        i: number,
        src: AsyncArray,
        cb: (result: any) => void
    ) => void
    initialValue: any
    cb: (result: any) => void
) => void

----------------------

Решение должно работать на Node.js 16
Запрещено использовать:
Арифметические операции и операции сравнения. Вместо них следует вызывать функции из Homework
Любые операции для работы с массивами. Доступны только методы AsyncArray
Импорты. Весь вспомогательный код следует положить в замыкание (см. оформление)
Комментарии в коде не проходят автотесты

*/