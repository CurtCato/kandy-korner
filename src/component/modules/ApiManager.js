const remoteURL = "http://localhost:5002"

export default {
  get(id, resource) {
    return fetch(`${remoteURL}/${resource}/${id}`).then(e => e.json())
  },
  getAll(resource) {
    return fetch(`${remoteURL}/${resource}`).then(e => e.json())
  }
}