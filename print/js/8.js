var bar = {
  myName: 'time.geekbang.com',
  printName: function () {
    console.log(myName)
  }
}
function foo() {
  let myName = '极客时间'
  return bar.printName
}
let myName = '极客邦'
let _printName = foo()
_printName() // 极客时间
bar.printName() // not defined
