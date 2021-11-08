"use strict";

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
  });
}

try {
  badProduct(5, 6);
} catch (_unused) {
  console.log("Error captured");
}

badAsyncProduct(5, 6, function (err, result) {
  if (err) {
    console.log("callback error captured");
  } else {
    console.log(result);
  }
});
badPromiseProduct(5, 6).then(function (result) {
  console.log(result);
})["catch"](function (error) {
  console.log("promise error captured", error);
  return 6;
}).then(function (x) {
  console.log(x);
});

function testBadPromiseProduct() {
  var result;
  return regeneratorRuntime.async(function testBadPromiseProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(badPromiseProduct(5, 6));

        case 3:
          result = _context.sent;
          console.log(result);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("promise error captured with try/catch + await");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

testBadPromiseProduct().then(function (result) {
  console.log("End testBadPromiseProduct");
});