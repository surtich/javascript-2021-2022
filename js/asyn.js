function asyncAdd(x, y, cbk) {
    setTimeout(function () {
        cbk(x + y);
    }, Math.floor(Math.random() * 50) + 50);
}

function asyncProduct(x, y, cbk) {
    setTimeout(function () {
        cbk(x * y);
    }, Math.floor(Math.random() * 50) + 50);
}


asyncProduct(6, 8, function (result) {
    console.log(result);
});

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

// Sumar asíncronamente [1, 4, 6, 2, 4] == 17; implementando 

function asyncAddArray(xs, cbk) {

}

// Sumar asíncronamente [1, 2, 3, 4] + [0, -1, 1, 2] ==  [1, 1, 4, 6]; implementando

function asyncAddArrays(xs, ys, cbk) {
}




