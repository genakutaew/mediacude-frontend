import Api from "./Api"

class EmployeesApi extends Api {
    index(data) {
        return this.axios.get("/employees", data)
    }

    store(data) {
        return this.axios.post("/employees", data)
    }

    update() {
        return this.axios.put("/employees")
    }

    destroy() {
        return this.axios.delete("/employees")
    }
}

export default new EmployeesApi()
