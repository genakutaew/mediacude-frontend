import Api from "./Api"

class EmployeesApi extends Api {
  index(data) {
    return this.axios.get("/employees", data)
  }

  store(data) {
    return this.axios.post("/employees", data)
  }

  update(id, data) {
    return this.axios.put("/employees/" + id, data)
  }

  destroy(id) {
    return this.axios.delete("/employees/" + id)
  }
}

export default new EmployeesApi()
