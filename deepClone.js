// @description:
//  paradigm:https://segmentfault.com/a/1190000016672263
let a = { a: 'a', b: { c: 'c' }, d: [1, { zj: 'zj' }, 3], date: new Date() }
function deepClone(obj) {
  if (!obj) {
    return
  }
  let res = Array.isArray(obj) ? [] : {}
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (value instanceof Date) {
      res[key] = new Date(value - 0)
    }
    if (typeof value === 'object') {
      // if (Array.isArray(value)) {
      //   // 数组处理
      //   res[key] = deepClone(value)
      // } else {
      //   // 递归处理
      //   res[key] = deepClone(value)
      // }
      res[key] = deepClone(value)

    } else {
      res[key] = value
    }
  })

  return res
}

let b = deepClone(a)
console.log(b)
