var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
function curry2(f) {
    return function (x) { return function (y) { return f(x, y); }; };
}
function product(x) {
    return function (y) {
        return x * y;
    };
}
var double = product(2);
var triple = product(3);
var xs = [1, 2, 3, 4];
map(xs, function (x) { return x + 1; });
map(xs, function (x) { return String(x); });
map(xs, function (x) { return x >= 18; });
map(["Pepe", "Juan", "Alfredo"], function (x) { return x.length; });
function reduce(xs, f, init) {
    var acc = init;
    for (var i = 0; i < xs.length; i++) {
        acc = f(acc, xs[i]);
    }
    return acc;
}
function reduceRight(xs, f, init) {
    if (xs.length === 0) {
        return init;
    }
    var head = xs[0], tail = xs.slice(1);
    return f(reduceRight(tail, f, init), head);
}
function reduceLeft(xs, f, init) {
    if (xs.length === 0) {
        return init;
    }
    var head = xs[0], tail = xs.slice(1);
    return reduceLeft(tail, f, f(init, head));
}
function map_with_reduce(xs, f) {
    return reduce(xs, function (ys, x) { return __spreadArrays(ys, [f(x)]); }, []);
}
function compose2(g, f) {
    return function (x) {
        return g(f(x));
    };
}
