const sampleString = 'the quick brown fox jumps over the lazy dog'

const letterFdist = (phrase) => {
  const result = {}
  for (const item of sampleString) {
    if (item !== ' ') {
      if (item in result) {
        result[item]++
      } else{
        result[item] = 1
      }
    }
  }
  for (const letter in result) {
    result[letter] = result[letter] / phrase.length
  }
  return result
}

console.log(
  letterFdist(sampleString)
)
