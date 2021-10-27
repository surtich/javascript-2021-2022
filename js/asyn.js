function add(x, y) {
    return x + y;
}


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

asyncAdd(5, 6, function (result) {
    console.log(result);
});

asyncProduct(6, 8, function (result) {
    console.log(result);
});