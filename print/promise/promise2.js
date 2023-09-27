
console.log('start')

new Promise(function(resolve) {
  console.log('promise1')
  setTimeout(() => {
    console.log('timer1')
  },0)
  resolve()
}).then(() => {
  console.log('promise2')
  setTimeout(() => {
    console.log('timer2')
  },0)
})

const promise1 = Promise.resolve().then(() => {
    console.log('promise3')
    setTimeout(() => {
        console.log('timer3')
    },0)
})

async function async1() {
  console.log('async1')
  await async2()
  console.log('async1 end');
}

async function async2 () {
  console.log('async2')
}

async1()

setTimeout(() => {
  console.log('timer4')
},0)

console.log('script end')

