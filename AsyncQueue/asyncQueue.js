// 1. 补全下面异步并发队列的实现
// 工作流程：
// 1. 队列可以同步或者异步的添加 QueueItem，QueueItem;
// 2. 向对列中添加 QueueItem 时异步自动触发队列消耗，并发数量不超过限制(parallelism)；
// 3. 消耗队列过程：调用 procesor 处理 QueueItem.data，拿到处理结果后传递给 QueueItem.resultHandler；

// interface QueueItem {
//     data: any,
//     resultHandler: (result) => void;
// }

class AsyncQueue {
  constructor(processor, parallelism = 10) {
    this.taskList = []
    this.limit = parallelism
    this.processor = processor
    this.count = 0
  }

  add(queueItem) {
    this.taskList.push(queueItem)
    this.start()
  }

  start() {
    while (this.count < this.limit && this.taskList.length) {
      this.count++
      const curTask = this.taskList.shift()
      const { data, resultHandler } = curTask
      // 当前任务end , 递归调用
      this.processor(data)
        .then((res) => {
          resultHandler(res)
        })
        .catch((err) => {
          resultHandler(err)
        })
        .finally(() => {
          this.count--
          this.start()
        })
    }
  }
}

// 用法
const q = new AsyncQueue(function (data) {
  return Promise.resolve(data)
}, 5)

q.add({ data: { path: 1, deps: 1 }, resultHandler: (d) => console.log(d) })

setTimeout(() => {
  q.add({ data: { path: 2, deps: 2 }, resultHandler: (d) => console.log(d) })
}, 1000)

Promise.resolve().then(() => {
  q.add({ data: { path: 3, deps: 3 }, resultHandler: (d) => console.log(d) })
})
