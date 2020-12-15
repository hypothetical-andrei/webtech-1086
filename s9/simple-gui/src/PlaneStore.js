import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class PlaneStore {
  constructor () {
    this.data = []
    this.emitter = new EventEmitter()
  }

  async getAll() {
    try {
      const response = await fetch(`${SERVER}/planes`)
      const data = await response.json()
      this.data = data
      this.emitter.emit('GET_PLANES_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_PLANES_ERROR')
    }
  }

  async addOne(plane) {
    try {
      await fetch(`${SERVER}/planes`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(plane)
      })
      this.getAll()
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_PLANE_ERROR')
    }
  }

  async saveOne(id, plane) {}

  async deleteOne(id) {}
}

const store = new PlaneStore()

export default store