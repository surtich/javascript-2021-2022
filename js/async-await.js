function resolveAfter2MilliSeconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 20);
    });
}

function promiseInc(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x + 1);
        }, 2000);
    });
}

let px = resolveAfter2MilliSeconds(20);
let py = resolveAfter2MilliSeconds(30);


async function add() {
    let x = await px;
    let y = await py + x;
    let z = x + y;

    return z;

    /*return px.then(function (x) {
        return py.then(function (y) {
            return x + y;
        })
    })*/
}

add().then(function (result) {
    console.log(result)
})