const sampleString = 'the quick brown fox jumps over,the lazy dog'

const fdist = (phrase) => {
  const items = phrase.split(new RegExp('[\\s,]'))
  const result = {}
  for (const item of items) {
    if (item in result) {
      result[item]++
    } else{
      result[item] = 1
    }
  }
  for (const word in result) {
    result[word] = result[word] / items.length
  }
  return result
}

console.log(fdist(sampleString))