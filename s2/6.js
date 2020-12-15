let sampleString = 'i got {0} from {1}'
let sampleItems = ['a car', 'somewhere']

const formatString = (inputString, items) => {
  let modified = inputString
  for (let i = 0; i < items.length; i++) {
    if (modified.indexOf('{' + i + '}') !== -1) {
      modified = modified.replace('{' + i + '}', items[i])
    }
  }
  return modified
}

// i got a car from somewhere
console.log(formatString(sampleString, sampleItems))
