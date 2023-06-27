// 同步请求队列，并且支持超时自动取消；

function testfunc(time) {
    // 构造一个假的请求
    return new Promise((resolve) => {
        setTimeout(() => { resolve(time) }, time)
    })

}
class Queue {
    constructor(time) {
        this.timeLimit = time
        this.taskList = []
    }
    add(fn, cb) {
        const task = this.generageDelayFunc(fn, cb)
        this.taskList.push(task)
        return this

    }
    generageDelayFunc(fn, cb) {
        return () => {
            let time = Date.now()
            let res = undefined
            // 请求成功再赋值
            fn().then(val => {
                res = val

            })
            return new Promise((resolve, reject) => {
                const timer = setInterval(async () => {
                    // 超出时间就结束掉请求
                    if (Date.now() - time >= this.timeLimit) {
                        clearInterval(timer)
                        if (res) {
                            cb(res);
                            resolve(true)
                        } else {
                            reject(new Error('time out'))

                        }

                    }
                }, 1000)
            })

        }

    }
    async start() {
        while (this.taskList.length) {
            await this.taskList.shift()();
        }
    }
}

new Queue(3000)
    .add(testfunc.bind(null, 1000), (res) => { console.log(res) })
    .add(testfunc.bind(null, 1100), (res) => { console.log(res) })
    .add(testfunc.bind(null, 3000), (res) => { console.log(res) })
    .add(testfunc.bind(null, 4000), (res) => { console.log(res) })
    .start()