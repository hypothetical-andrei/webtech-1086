const myModule = require("./my-module/my-module")

class Storage {
  constructor(){
    this.content = {}
  }

  setKey(key, value) {
    this.content[key] = value
  }

  getKey(key) {
    return this.content[key]
  }
}

const storage = new Storage()

const getStorage = () => {
  return storage
}

module.exports = {
  getStorage
}