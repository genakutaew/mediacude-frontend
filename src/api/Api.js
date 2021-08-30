import axios from "axios"

class Api {
    constructor() {
        this.axios = axios.create({
            baseURL: "/api",
            headers: {},
        })

        this.axios.interceptors.request.use(
            (config) => {

                return config
            }
        )

        this.axios.interceptors.response.use(
            (response) => {

                return Promise.resolve(response)
            },
            (error) => {

                return Promise.reject(error)
            }
        )
    }
}

export default Api
