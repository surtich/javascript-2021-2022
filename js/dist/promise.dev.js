"use strict";

var p = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(4);
    console.log(p);
  }, 1000);
});
p.then(function (result) {
  console.log(result);
});

var promiseAdd = function promiseAdd(x, y) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(x + y);
    }, 100);
  });
};

var promiseInc = function promiseInc(x) {
  return promiseAdd(1, x);
};

var promiseDouble = function promiseDouble(x) {
  return promiseProduct(2, x);
};

var promiseProduct = function promiseProduct(x, y) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(x * y);
    }, 10);
  });
};

var promiseMod = function promiseMod(x, y) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(x % y);
    }, 10);
  });
}; // (4+5)*6
// bad


promiseAdd(4, 5).then(function (result) {
  promiseProduct(result, 6).then(function (result) {
    console.log("add then product", result);
  });
}); // good

promiseAdd(4, 5).then(function (result) {
  return promiseProduct(result, 6);
}).then(function (result) {
  console.log("¿54?", result);
  return result;
}).then(function (result) {
  return promiseAdd(result, 3);
}).then(function (result) {
  console.log("¿57?", result);
});

function print(msg, result) {
  console.log(msg, result);
  return result;
} // better


promiseAdd(4, 5).then(function (result) {
  return promiseProduct(result, 6);
}).then(print.bind(null, "better pass 1")).then(function (result) {
  return promiseAdd(result, 3);
}).then(print.bind(null, "better result")); // the best

promiseAdd(4, 5).then(print.bind(null, "best ¿9?")).then(promiseProduct.bind(null, 6)).then(print.bind(null, "best ¿54?")).then(promiseAdd.bind(null, 3)).then(print.bind(null, "best ¿57?"));
var x = 3,
    y = 15; // ¿15 + 3?
// ¿15 * 3?
// ¿15 % 3?

Promise.all([promiseAdd, promiseProduct, promiseMod].map(function (promiseOper) {
  return promiseOper(x, y);
})).then(function (results) {
  console.log(results);
});
Promise.race([promiseAdd, promiseProduct, promiseMod].map(function (promiseOper) {
  return promiseOper(x, y);
})).then(function (results) {
  console.log("promise race", results);
});
Promise.all([1, 2, 3].map(function (x) {
  return promiseInc(x);
})).then(function (results) {
  console.log(results);
});
console.log(Promise.resolve(4444444));

function promiseReduce(xs, promiseReducer, init) {
  var promiseResult = Promise.resolve(init);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var x = _step.value;
      promiseResult = promiseResult.then(function (result) {
        return promiseReducer(result, x);
      });
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

  return promiseResult;
}

function promiseCompose() {
  for (var _len = arguments.length, fs = new Array(_len), _key = 0; _key < _len; _key++) {
    fs[_key] = arguments[_key];
  }

  return function (x) {
    return fs.reduceRight(function (promiseX, f) {
      return promiseX.then(function (y) {
        return f(y);
      });
    }, Promise.resolve(x));
  };
}

promiseReduce([1, 2, 3], promiseAdd, 0).then(function (result) {
  console.log("promiseReduce:", result);
}); // promiseCompose([promiseInc, promiseDouble, promiseDouble])

promiseCompose(promiseInc, promiseDouble, promiseDouble)(1).then(function (result) {
  console.log("promiseCompose", result);
});