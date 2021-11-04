const p = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(4);
        console.log(p)
    }, 1000);
});


p.then(function (result) {
    console.log(result)
})

const promiseAdd = function (x, y) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(x + y);
        }, 100);
    })
}

const promiseInc = x => promiseAdd(1, x);
const promiseDouble = x => promiseProduct(2, x);


const promiseProduct = function (x, y) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(x * y);
        }, 10);
    })
}

const promiseMod = function (x, y) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(x % y);
        }, 10);
    })
}


// (4+5)*6
// bad
promiseAdd(4, 5).then(function (result) {
    promiseProduct(result, 6).then(function (result) {
        console.log("add then product", result)
    });
});

// good
promiseAdd(4, 5).then(function (result) {
    return promiseProduct(result, 6)
}).then(function (result) {
    console.log("¿54?", result);
    return result;
}).then(function (result) {
    return promiseAdd(result, 3);
}).then(function (result) {
    console.log("¿57?", result)
});


function print(msg, result) {
    console.log(msg, result)
    return result;
}


// better
promiseAdd(4, 5)
    .then(result => promiseProduct(result, 6))
    .then(print.bind(null, "better pass 1"))
    .then(result => promiseAdd(result, 3))
    .then(print.bind(null, "better result"))


// the best
promiseAdd(4, 5)
    .then(print.bind(null, "best ¿9?"))
    .then(promiseProduct.bind(null, 6))
    .then(print.bind(null, "best ¿54?"))
    .then(promiseAdd.bind(null, 3))
    .then(print.bind(null, "best ¿57?"));


var [x, y] = [3, 15];

// ¿15 + 3?
// ¿15 * 3?
// ¿15 % 3?

Promise.all([promiseAdd, promiseProduct, promiseMod].map(function (promiseOper) {
    return promiseOper(x, y);
})).then(function (results) {
    console.log(results)
})


Promise.race([promiseAdd, promiseProduct, promiseMod].map(function (promiseOper) {
    return promiseOper(x, y);
})).then(function (results) {
    console.log("promise race", results);
})

Promise.all([1, 2, 3].map(function (x) {
    return promiseInc(x)
})).then(function (results) {
    console.log(results)
})

console.log(Promise.resolve(4444444))


// promiseReduce([1,2,3], promiseAdd, 0) -> Promise(6)
// promiseCompose([promiseInc, promiseDouble, promiseDouble]) 

// promiseCompose([promiseInc, promiseDouble, promiseDouble])(1) -> Promise(5)

