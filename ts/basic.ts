function map<A, B>(xs: A[], f: (x:A) => B): B[] {
  var ys: B[] = [];
  for (var i = 0; i < xs.length; i++) {
    ys.push(f(xs[i]));
  }
  return ys;
}


  function filter<A>(xs:A[], f:(x: A) => boolean): A[] {
    var ys = [];
    for (var i = 0; i < xs.length; i++) {
      if (f(xs[i])) {
        ys.push(xs[i]);
      }
    }
    return ys;
  }


  function curry2<A, B, C>(f: (x: A, y: B) => C): (x: A) => (y: B) => C {
    return x => y => f(x, y);
  }



  function product(x: number) {
    return function (y: number) {
      return x * y;
    };
  }
  
  var double = product(2);
  
  var triple = product(3);
  


  var xs: number[] = [1, 2, 3, 4];


  map(xs, x => x + 1);

  map(xs, x => String(x));

  map(xs, x => x >= 18);

  map(["Pepe", "Juan", "Alfredo"], x =>x.length);



function reduce<A, B>(xs: A[], f: (acc: B , x: A ) => B, init: B): B {
  var acc = init;
  for (var i = 0; i < xs.length; i++) {
    acc = f(acc, xs[i]);
  }
  return acc;
}

function map_with_reduce<A, B>(xs: A[], f: (x:A) => B): B[] {
  return reduce(xs, (ys, x) => [...ys, f(x)], []);
}


function compose2<A, B, C>(g: (y: B) => C, f: (x: A) => B): (x: A) => C {
  return function(x) {
    return g(f(x));
  };
}

  