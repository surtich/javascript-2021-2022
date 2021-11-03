function asyncAdd(x, y, cbk) {
    setTimeout(function () {
        cbk(x + y);
    }, Math.floor(Math.random() * 20) + 50);
}

function asyncProduct(x, y, cbk) {
    setTimeout(function () {
        cbk(x * y);
    }, Math.floor(Math.random() * 50) + 50);
}


asyncProduct(6, 8, function (result) {
    console.log(result);
});
/*
asyncProduct(3, 4, function (product) {
    asyncAdd(product, 5, function (sum) {
        asyncProduct(sum, 8, function (result) {
            console.log(result);
        });
    });
});

const step3 = (x, y) => asyncProduct(x, y, function (result) {
    console.log(result);
});

const step2 = (x, y, z) => asyncAdd(x, y, function (sum) {
    step3(sum, z);
});

const step1 = (x, y, z, k) => asyncProduct(x, y, function (product) {
    step2(product, z, k);
});


step1(3, 4, 5, 8);
*/
// Sumar asíncronamente [1, 4, 6, 2, 4] == 17; implementando 

function asyncAddArray(xs, cbk) {
    if (xs.length === 0) {
        return cbk(0);
    }

    const [head, ...tail] = xs;
    asyncAddArray(tail, function (result) {
        asyncAdd(head, result, cbk)
    })
}

function asyncReduceRight(xs, f, init, cbk) {
    for (let x of xs) {
        cbk = (function (cbk) {
            return function (result) {
                f(x, result, cbk);
            }
        })(cbk)
    }
    cbk(init);
}

// Sumar asíncronamente [1, 2, 3, 4] + [0, -1, 1, 2] ==  [1, 1, 4, 6]; implementando

function zipWith(xs, ys, f, cbk) {
    const zs = [];
    const max_size = Math.min(xs.length, ys.length);
    let size = 0;
    for (let i = 0; i < max_size; i++) {
        f(xs[i], ys[i], function (result) {
            size++;
            zs[i] = result;
            if (size === max_size) {
                cbk(zs);
            }
        });
    }
}


zipWith([1, 2, 3, 4], [0, -1, 1, 2], asyncAdd, function (result) {
    console.log(result);
});

zipWith([1, 2, 3, 4], [0, -1, 1, 2], asyncProduct, function (result) {
    console.log(result);
});


asyncReduceRight([1, 2, 3], asyncAdd, 0, function (result) {
    console.log(result);
})

asyncReduceRight([1, 2, 4], asyncProduct, 1, function (result) {
    console.log(result);
})


function asyncInc(x, cbk) {
    asyncAdd(x, 1, cbk);
}

function asynDouble(x, cbk) {
    asyncProduct(x, 2, cbk)
}


// asyncMap [1,2,3], inc => [2,3,4]

// asyncCompose(...asyncF)

// asyncMap([1,2,3], asyncCompose(asyncInc, asyncInc, asynDouble)) 




function asyncCompose(asyncG, asyncF) {
    return function (x, cbk) {
        asyncF(x, function (y) {
            asyncG(y, cbk)
        })
    }
}

function asyncMultiCompose(...fs) {
    if (fs.length === 0) {
        return (x, cbk) => cbk(x)

    }

    let f = fs[fs.length - 1];
    let gs = fs.slice(0, fs.length - 1)
    let g = asyncMultiCompose(...gs)

    return function (x, cbk) {
        f(x, function (y) {
            g(y, cbk);
        })

    }
}

const z = asyncMultiCompose(asyncInc, asyncInc, asynDouble)

z(4, function (result) {
    console.log(">>>>>", result);
})

