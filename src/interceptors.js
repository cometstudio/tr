import axios from "axios";

axios.interceptors.request.use(function (config) {
    config.headers.Accept = 'application/json';

    let api_token = window.localStorage.getItem('api_token')
    if (api_token !== null) config.headers.Authorization = `Bearer ${api_token}`;

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});