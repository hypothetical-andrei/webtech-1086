const apply = (value, transformation) => {
  return transformation(value)
}

console.log(apply(5, (x) => x * 2))