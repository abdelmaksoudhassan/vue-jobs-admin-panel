import axios from 'axios'

const axiosWrite = axios.create({
    baseURL:'https://vue-jobs-21d2a.firebaseio.com'
})

export default axiosWrite

