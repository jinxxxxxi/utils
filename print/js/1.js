// 1. 根据后面的每次调用写出 o 的输出结果：
function fun(n, o) {
    console.log(o);
    return {
      n: 10,
      fun: function (m) {
        return fun(m, n);
      }
    };
  }
  
  
  //在第一次调用时，执行 fun(0)，参数 o 的值为 undefined，因此会先输出 undefined，然后返回一个对象 {n: 10, fun: function(m) {return fun(m, n);}}。

// 在接下来的三次调用中，都是通过对象 a 调用方法 fun，该方法会递归调用函数 fun，并将对象 a 的属性 n 作为参数(闭包缓存为0), o 传递给函数 fun。因此，无论调用多少次方法 fun，都会输出对象 a 的属性 n 的值，即输出 0。
var a = fun(0); // undefined
  // 这下面的fun 跟上面的没关系，因为有个闭包， 所以还是0
  a.fun(1);  // 0
  a.fun(2); //  0
  a.fun(3); //  0
  
  

// 在链式调用中，每次调用方法 fun 都会返回一个新的对象，因此每次输出的值都是前一次调用的参数 o。第一次调用时，参数 o 为 0，因此输出 undefined 和 0。
// 第二次调用时，前一次的参数 o 为 0，因此输出 0 和 1。以此类推，最终输出的结果为 undefined, 0, 1, 2。
  var b = fun(0).fun(1).fun(2).fun(3);
  
  // undefined  0 1 2
  
  
  
  
  