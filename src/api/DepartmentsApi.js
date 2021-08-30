import Api from "./Api"

class DepartmentsApi extends Api {
    index(data) {
        return this.axios.get("/departments", data)
    }

    store(data) {
        return this.axios.post("/departments", data)
    }

    update() {
        return this.axios.put("/departments")
    }

    destroy(data) {
        return this.axios.delete("/departments", data)
    }
}

export default new DepartmentsApi()
