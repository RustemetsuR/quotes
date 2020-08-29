import axios from 'axios';

const axiosQuote = axios.create({
    baseURL: 'https://quotes-exam8.firebaseio.com/',
});

export default axiosQuote;