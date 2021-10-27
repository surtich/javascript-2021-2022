"use strict";

function Person(x) {
  this.x = x;

  this.kk = function () {
    var _this = this;

    return function () {
      return ">>>>" + _this.x;
    };
  };
}

var p = new Person("fdffd");
console.log(p.kk()());
new Person("dfdfdfdf").kk();