
console.log("1");
let p1 = new Promise((resolve, reject) => {
	resolve("p1");
});
let p2 = new Promise((resolve, reject) => {
	resolve("p2");
});
async function getUserInfo() {
    console.log("2");
    
    p1.then((res) => {
    	console.log(res);
    });
    
    
    var awaitRes = await userInfo();
    console.log(awaitRes); // 接口返回值---------------data
    
    p2.then((res) => {
    	console.log(res);
    });
    
    console.log("3"); // 在微任务中有同步队列，又会优先执行
}
async function  userInfo(){
    return 'data'
}


setTimeout(()=>{console.log('9')},0)
console.log("4");
getUserInfo(); // 异步方法，加入任务队列执行
console.log("5");

// 1 4 2 5 p1 data 3 p2 9