"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

  var _xs = _toArray(xs),
      head = _xs[0],
      tail = _xs.slice(1);

  asyncAddArray(tail, function (result) {
    asyncAdd(head, result, cbk);
  });
}

function asyncReduceRight(xs, f, init, cbk) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var x = _step.value;

      cbk = function (cbk) {
        return function (result) {
          f(x, result, cbk);
        };
      }(cbk);
    };

    for (var _iterator = xs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  cbk(init);
} // Sumar asíncronamente [1, 2, 3, 4] + [0, -1, 1, 2] ==  [1, 1, 4, 6]; implementando


function zipWith(xs, ys, f, cbk) {
  var zs = [];
  var max_size = Math.min(xs.length, ys.length);
  var size = 0;

  var _loop2 = function _loop2(i) {
    f(xs[i], ys[i], function (result) {
      size++;
      zs[i] = result;

      if (size === max_size) {
        cbk(zs);
      }
    });
  };

  for (var i = 0; i < max_size; i++) {
    _loop2(i);
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
});
asyncReduceRight([1, 2, 4], asyncProduct, 1, function (result) {
  console.log(result);
});

function asyncInc(x, cbk) {
  asyncAdd(x, 1, cbk);
}

function asynDouble(x, cbk) {
  asyncProduct(x, 2, cbk);
} // asyncMap [1,2,3], inc => [2,3,4]
// asyncCompose(...asyncF)
// asyncMap([1,2,3], asyncCompose(asyncInc, asyncInc, asynDouble)) 


function asyncCompose(asyncG, asyncF) {
  return function (x, cbk) {
    asyncF(x, function (y) {
      asyncG(y, cbk);
    });
  };
}

function asyncMultiCompose() {
  for (var _len = arguments.length, fs = new Array(_len), _key = 0; _key < _len; _key++) {
    fs[_key] = arguments[_key];
  }

  if (fs.length === 0) {
    return function (x, cbk) {
      return cbk(x);
    };
  }

  var f = fs[fs.length - 1];
  var gs = fs.slice(0, fs.length - 1);
  var g = asyncMultiCompose.apply(void 0, _toConsumableArray(gs));
  return function (x, cbk) {
    f(x, function (y) {
      g(y, cbk);
    });
  };
}

var z = asyncMultiCompose(asyncInc, asyncInc, asynDouble);
z(4, function (result) {
  console.log(">>>>>", result);
});