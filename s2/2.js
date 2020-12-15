const fib = (n) => {
  switch(n) {
    case 0:
    case 1:
      return 1
    default:
      return fib(n - 1) + fib(n - 2)
  }
}


if (process.argv.length < 3) {
  console.log('node 2.js <fibonacci index>')
} else {
  const param = parseInt(process.argv[2])
  if (isNaN(param)) {
    console.log('parameter must be an int')
  } else {
    console.log(fib(param))
  }
}