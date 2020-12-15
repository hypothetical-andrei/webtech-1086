const storage = require('./storage')

const doStuff = () => {
  let value = storage.getStorage().getKey('somekey')
  console.log(value)
}

module.exports = {
  doStuff
}