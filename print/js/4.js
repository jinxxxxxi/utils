var a = 1;

function fn() {
   var b = 10;
   c = 100;
   let d = 20;
   console.log(1000)
   return function() {
     console.log(a); 
     console.log(b);
     console.log(d)
   }
}

var func = fn();
func();
console.log(b);
console.log(d);
