function testFunction(a, b, c) {
  for (let i = 0; i < 10000; i++) {
    console.log(a + b + c + i)
  }
}

function getTimedFunction(f) {
  return function (...args) {
    let before = Date.now()
    let result = f(...args)
    let after = Date.now()
    console.log(`execution took ${after - before} milliseconds`)
    return result
  }
}

let timedTestFunction = getTimedFunction(testFunction)

timedTestFunction(1,2,3)