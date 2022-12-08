import Axios from "axios";

const instance = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api/' /*local server*/
    // baseURL: 'http://192.168.10.14:8000/api/' /*local server*/
})

export default instance