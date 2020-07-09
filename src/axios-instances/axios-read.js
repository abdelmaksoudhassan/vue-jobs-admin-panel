import axios from 'axios'

const axiosRead = axios.create({
    baseURL: 'https://vue-jobs-21d2a.firebaseio.com/'
})

export default axiosRead