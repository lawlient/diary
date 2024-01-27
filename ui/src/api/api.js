import axios from "axios";



var HOSTNAME = import.meta.env.VITE_BASE_URL
var BASEPATH = import.meta.env.BASE_URL
axios.defaults.baseURL = HOSTNAME + BASEPATH
axios.defaults.headers["Authorization"] = localStorage.getItem("__token__")

axios.interceptors.response.use((response) => {
    return response;
}, (error) => { // Anything except 2XX goes to here
    const status = error.response?.status || 500;
    if (status === 401) {
        window.location = window.location.protocol + "//" + window.location.host + "/signin"
    } else {
        return Promise.reject(error); // Delegate error to calling side
    }
});



// ----------------------- auth  ------------------------------
export function signin(info) {
    return axios.post("/api/auth/signin", info)
}

export function signup(info) {
    return axios.post("/api/auth/signup", info)
}




// ------------------------ diary -----------------------------

export function getdiary(day) {
    return axios.post("/api/daily/", {day: day})
}

export function savediary(info) {
    return axios.post("/api/daily/update", info)
}


// ------------------------ monthly -----------------------------

export function getmonthly(day) {
    return axios.post("/api/monthly/", {day: day})
}

export function savemonthly(info) {
    return axios.post("/api/monthly/update", info)
}