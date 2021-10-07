"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isPair(number) {
  return number % 2 == 0;
}

var product = function product(x, y) {
  return x * y;
};

function curry2(f) {
  return function () {
    for (var _len = arguments.length, xs = new Array(_len), _key = 0; _key < _len; _key++) {
      xs[_key] = arguments[_key];
    }

    if (xs.length >= 2) {
      return f.apply(void 0, xs);
    }

    return function (y) {
      return f(xs[0], y);
    };
  };
}

var curriedProduct = curry2(product);

var _double = curriedProduct(2);

var triple = curriedProduct(3);

function map(xs, f) {
  var ys = [];

  for (var i = 0; i < xs.length; i++) {
    ys.push(f(xs[i]));
  }

  return ys;
}

function filter(xs, f) {
  var ys = [];

  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i])) {
      ys.push(xs[i]);
    }
  }

  return ys;
}

var numbers = [1, 4, 6];
var numbers2 = [2, 7, 9, 10];
var acronym = "Organizacion Naciones Unidas";
console.log(map(numbers, _double));
console.log(map(numbers2, triple));
console.log(map(acronym.split(" "), function (word) {
  return word[0];
}).join("")); // ONU

console.log(map(acronym.split(" "), function (word) {
  return word[0];
}).join("")); // ONU
// recibe un número y lo incrementa en 1

function inc() {}

console.log(map(numbers, inc)); //[2, 5, 7]
//[111,  121,  1331,   12,    190091]  entrada
//[true, true, true,   false, true] salida
// 4! = 4 * 3 * 2 * 1

function fact_iter(n) {
  var fact = 1;

  for (var i = n; i > 1; i--) {
    fact *= i;
  }

  return fact;
}

console.log(fact_iter(5), fact_iter(2), fact_iter(1), fact_iter(0)); // 4! = 4 * 3!
// 3! = 3 * 2!
// 2! = 2 * 1!
// 1! = 1

function fact_recur(n) {
  if (n <= 1) {
    return 1;
  } else {
    return n * fact_recur(n - 1);
  }
} //console.log(fact_recur(5), fact_recur(2), fact_recur(1), fact_recur(0));
//console.log(fact_iter(50000));
//console.log(fact_recur(50000));


var numbers3 = [1, 34, 56, 19, 100];
console.log(map(numbers3, isPair));
console.log(filter(numbers3, isPair));
console.log(map(filter(numbers3, isPair), _double));
console.log(numbers3.filter(isPair).map(_double));

function noEmpty(xs) {
  if (Array.isArray(xs)) {
    var as = xs.filter(function (ys) {
      var zs = noEmpty(ys);
      return zs.length !== 0;
    });
    console.log(">>>>", as);
  }

  return true;
} //console.log(noEmpty([[1, 2, 3], [], ["p", "q"], [], [], [[], []], [[1], [3], []]])); // [[1,2,3], ["p", "q"], [[1], [3]]]  


console.log(noEmpty([[1, []]]));
console.log(_double(7), triple(7), map([1, 2, 3], _double));
console.log(curriedProduct(4)(5));
console.log(curriedProduct(4, 5));

function add(x, y) {
  return x + y;
}

function minus(x, y) {
  return x - y;
}

function max(x, y) {
  return x > y ? x : y;
}

function min(x, y) {
  return x < y ? x : y;
}

function reduce(xs, f, init) {
  var acc = init;

  for (var i = 0; i < xs.length; i++) {
    acc = f(acc, xs[i]);
  }

  return acc;
}

console.log(reduce([1, 2, 3, 4], add, 0));
console.log(reduce([1, 2, 3, 4], max, 0));
console.log(reduce([-1, -2, -3, -4], max, -Infinity));
console.log(reduce([-1, -23], min, NaN));
console.log(reduce([], min, NaN));
console.log(reduce([1, 2, 3, 4, 6], function (acc, x) {
  return isPair(x) ? acc + 1 : acc;
}, 0));
console.log(reduce(["Pepe", "Alfredo", "José Luis", "Rosa"], function (acc, x) {
  return acc.length > x.length ? acc : x;
}, ""));
console.log([1, 2, 3, 4].reduce(add, 0));
console.log(reduce([1, 2, 3, 4], minus, 0));
console.log([1, 2, 3, 4].reduce(minus, 0));
console.log([1, 2, 3, 4].reduce(minus));

function map_recur(xs, f) {
  if (xs.length === 0) {
    return [];
  }

  var _xs = _toArray(xs),
      head = _xs[0],
      tail = _xs.slice(1);

  return [f(head)].concat(_toConsumableArray(map_recur(tail, f)));
}

function map_with_reduce(xs, f) {
  return reduce(xs, function (ys, x) {
    return [].concat(_toConsumableArray(ys), [f(x)]);
  }, []);
}

console.log(map_recur([1, 2, 3], _double));
console.log(map_with_reduce([1, 2, 3], _double));
console.log([1, 2, 3, 4].map(function (x) {
  return [x * 2];
}));