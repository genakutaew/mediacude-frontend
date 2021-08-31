import Api from "./Api"

class DepartmentsApi extends Api {
  index(data) {
    return this.axios.get("/departments", data)
  }

  store(data) {
    return this.axios.post("/departments", data)
  }

  update(id, data) {
    return this.axios.put("/departments/" + id, data)
  }

  destroy(id) {
    return this.axios.delete("/departments/" + id)
  }
}

export default new DepartmentsApi()
