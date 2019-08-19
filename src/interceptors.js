import axios from "axios";

axios.interceptors.request.use(function (config) {
    config.headers.Accept = 'application/json';

    // Fetch a token from local storage and attach it (if exists) to the Authorization header on EVERY request.
    let apiToken = window.localStorage.getItem('apiToken')
    if (apiToken !== null) config.headers.Authorization = `Bearer ${apiToken}`;

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