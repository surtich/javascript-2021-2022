"use strict";

function resolveAfter2MilliSeconds(x) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(x);
    }, 20);
  });
}

function promiseInc(x) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(x + 1);
    }, 2000);
  });
}

var px = resolveAfter2MilliSeconds(20);
var py = resolveAfter2MilliSeconds(30);

function add() {
  var x, y, z;
  return regeneratorRuntime.async(function add$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(px);

        case 2:
          x = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(py);

        case 5:
          _context.t0 = _context.sent;
          _context.t1 = x;
          y = _context.t0 + _context.t1;
          z = x + y;
          return _context.abrupt("return", z);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

add().then(function (result) {
  console.log(result);
});