const genCheckPrime = () => {
  let cache = []
  return (n) => {
    if (cache.indexOf(n) !== -1) {
      console.log(`found ${n} in cache`)
      return true
    } else {
      for (let i = 2; i <= n ** 1/2; i++) {
        if (n % i === 0) {
          return false
        }
      }
      cache.push(n)
      return true
    }
  }
}

let checkPrime = genCheckPrime()

console.log(checkPrime(13))
console.log(checkPrime(27))
console.log(checkPrime(3))
console.log(checkPrime(13))
console.log(checkPrime(13))