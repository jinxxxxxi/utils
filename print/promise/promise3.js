
/**
 * 执行 await async2()。我们知道，await 会立即执行同行代码，阻塞下一行代码，
	（await 也会暂停async后面的代码，先执行async外面的同步代码）
	流程进入 async2()函数，并返回 Promise 对象，即返回
    =>>>> async2.then(() => {console.log('async1 end')})。
	这里就会把 .then() 里面的内容放到当前宏任务的微任务队列中(即await 阻塞下一行代码)，将其命名为task1.
	此时task1并没有执行，因为微任务会在当前宏任务的同步代码执行完成后，才会依次执行。
	同时也会执行 async2() 的构造函数，输出async2 
    */


async function async1() {
	console.log('async1 start')
	await async2()
	console.log('async1 end') // 会进入微任务队列
}



async function async2 () {
	console.log('async2')
}

console.log('script start')

setTimeout(function() {
	console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
	console.log('proimse1')
	resolve()
}).then(function() {
	console.log('promise2')
})
console.log('script end')
