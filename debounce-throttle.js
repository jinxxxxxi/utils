function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    console.log('zj', args)

    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function throttle(fn, delay) {
  let last = 0
  return function (...args) {
    let now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this, args)
    }
  }
}
function sum(a) {
  console.log(a)
}

// let test = debounce(sum, 1000);
let test = throttle(sum, 1000)

for (let i = 0; i < 10000000000; i++) {
  test(i)
}
