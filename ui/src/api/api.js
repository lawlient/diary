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
        window.location =  BASEPATH + "signin"
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

// ----------------------- auth  ------------------------------
export function getuser(username) {
    return axios.post("/api/user/", {
        username: username,
    })
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

// ------------------------ yearly -----------------------------

export function getyearly(day) {
    return axios.post("/api/yearly/", {day: day})
}

export function saveyearly(info) {
    return axios.post("/api/yearly/update", info)
}


// ------------------------ tasks -----------------------------

export function gettasklist(day) {
    return axios.post("/api/tasks/", {day: day})
}

export function addtask(t) {
    return axios.post("/api/tasks/add", t)
}

export function edittask(t) {
    return axios.post("/api/tasks/update", t)
}

export function counttask(b, e) {
    return axios.get("/api/tasks/countbyday?begin=" + b + "&end=" + e)
}