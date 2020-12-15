function map(array, transformation) {
  const result = []
  for (const element of array) {
    result.push(transformation(element))
  }
  return result
}

let sampleArray = [1,2,3,4,5]
let sampleTransformation = (x) => x ** 2

console.log(map(sampleArray, sampleTransformation))