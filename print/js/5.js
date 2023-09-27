var a = 33;
function fu(a) {
    console.log(a);
    var a = 123;
    console.log(a);
    function a() {
        console.log(a);
    }
    console.log(b);
    var b = function () {}
    console.log(b);
    function b() { }
}
console.log(a)
fu(2);

//33 fucntion_a 123 function_b function_b

// JavaScript中的函数是一等公民，函数声明的优先级最高，会被提升至当前作用域最顶端
// 变量提升后
function fu(a) {
    function a() {
        console.log(a);
    }
    function b() { }
    var b;

    console.log(a);
    a = 123;
    console.log(a);
    console.log(b);
     b= function () {}
    console.log(b);
    
}