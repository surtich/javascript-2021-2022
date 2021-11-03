const timer = setInterval(function () {
    console.log(">>>")
}, 1000)

setTimeout(function () {
    clearInterval(timer);
}, 4500)