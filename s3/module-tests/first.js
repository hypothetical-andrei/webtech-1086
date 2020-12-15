const storage = require('./storage')

const doStuff = () => {
  storage.getStorage().setKey('somekey', 'somevalue')
}

module.exports = {
  doStuff
}