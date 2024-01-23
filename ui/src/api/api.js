import axios from "axios";



var HOSTNAME = import.meta.env.VITE_BASE_URL
var BASEPATH = import.meta.env.BASE_URL
axios.defaults.baseURL = HOSTNAME + BASEPATH

export function signin(info) {
    return axios.post("/api/auth/signin", info)
}

export function signup(info) {
    return axios.post("/api/auth/signup", info)
}