function badProduct(x, y) {
    throw new Error("Error in bad product!");
}

function badAsyncProduct(x, y, cbk) {
    setTimeout(function () {
        cbk("Error in badAsyncProduct");
    }, Math.floor(Math.random() * 50) + 50);
}

function badPromiseProduct(x, y) {
    return new Promise(function (resolve, reject) {
        reject("Error in promiseProduct");
    })
}

try {
    badProduct(5, 6);
} catch {
    console.log("Error captured")
}

badAsyncProduct(5, 6, function (err, result) {
    if (err) {
        console.log("callback error captured")

    } else {
        console.log(result);
    }
});

badPromiseProduct(5, 6).then(function (result) {
    console.log(result)
}).catch(function (error) {
    console.log("promise error captured", error)
    return 6;
}).then(function (x) {
    console.log(x)
})

async function testBadPromiseProduct() {
    try {
        let result = await badPromiseProduct(5, 6);
        console.log(result);
    } catch {
        console.log("promise error captured with try/catch + await")
    }
}


testBadPromiseProduct().then(function (result) {
    console.log("End testBadPromiseProduct")
})