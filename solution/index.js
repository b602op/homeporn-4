module.exports = (Homework) => async (array, fn, initialValue, cb) => {
    const promiseWrapper = (callback) => (...props) => new Promise(
        (resolve) => callback(...props, (result) => resolve(result)));

    let accumulator = initialValue;
    let index = 0;
    const arrLength = await promiseWrapper(array.length)();

    if (!accumulator) {
        accumulator = await promiseWrapper(array.get)(index);
        index = 1;
    }

    while(await promiseWrapper(Homework.less)(index, arrLength)) {
        const item = await promiseWrapper(array.get)(index);
        accumulator = await promiseWrapper(fn)(accumulator, item, index, array);
        index = await promiseWrapper(Homework.add)(index, 1);
    }

    cb(accumulator)
}
