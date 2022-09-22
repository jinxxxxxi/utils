function testfunc(time) {
    // 构造一个假的请求
    return new Promise((resolve) => {
        setTimeout(() => { resolve(time) }, time)
    })

}
class Queue {
    constructor() {
        this.taskList = []
    }
    add(fn, cb) {
        const task = this.generageDelayFunc(fn, cb)
        this.taskList.push(task)
        return this

    }
    generageDelayFunc(fn, cb) {
        return function () {
            let time = Date.now()
            let res = undefined
            // 请求成功再赋值
            const promise = fn().then(val => {
                res = val
            })
            return new Promise((resolve, reject) => {
                // 轮询到3s, 有值就反回，否则抛出错误
                const timer = setInterval(async () => {
                    if (Date.now() - time >= 3000) {
                        clearInterval(timer)
                        if (res) {
                            cb(res),
                                resolve()
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
            await this.taskList.shift()()
        }
    }
}

new Queue()
    .add(testfunc.bind(null, 1000), (res) => { console.log(res) })
    .add(testfunc.bind(null, 2000), (res) => { console.log(res) })
    .add(testfunc.bind(null, 3000), (res) => { console.log(res) })
    .add(testfunc.bind(null, 4000), (res) => { console.log(res) })
    .start()