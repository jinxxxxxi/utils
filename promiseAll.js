function promiseAll(promiseList) {
  let count = 0
  let resData = []
  return new Promise((resolve, reject) => {
    promiseList.forEach(async (promise) => {
      // Promise.all传递的参数可能不是Promise类型，可能不存在then方法
      Promise.resolve(promise).then((res) => {
        try {
          resData.push(res)
          count += 1
          if (count === promiseList.length) {
            resolve(resData)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  })
}
