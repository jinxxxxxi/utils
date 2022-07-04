function promiseRace(promiseList) {
  return new Promise(function (resolve, reject) {
    promiseList.forEach(function (promise) {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  })
}
