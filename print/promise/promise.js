// 2. 写出以下代码在标准浏览器的输出顺序
  
// 它先计算出右侧的结果；
// 看到 await 后，中断 async 函数，先执行 async 外的同步代码,然后回来继续执行微任务。
// await后面的所有类型代码直接扔到微任务队列中，稍后执行
// await后面的代码会变成async2.then(()=>console.log(2))，从而进入下一个微任务队列。
async function async1() {
    console.log(1);
    await async2();
    console.log(2);
  }
  
  
  async function async2() {
    console.log(3)
  }
  
  
  // main
  console.log(4)
  setTimeout(function () {
    console.log(5)
  }, 0);
  
  
  async1();
  
  
  new Promise(function (resolve) {
    console.log(6);
    resolve();
  }).then(function () {
    console.log(7)
  })
  
  
console.log(8);
  
// 41368275
  
