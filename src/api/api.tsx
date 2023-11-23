import axios, {AxiosRequestConfig} from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6060/api/', // port that is used for backend
    withCredentials: true,
})

// user 
export const loginEndpoint = 'user/login';
export const registerEndpoint = 'user/register';

const headers = {
    'content-type': 'application/x-www-form-urlencoded',
};

type loginCredentials = {
    email: string,
    password: string,
}

export const login = async ({email, password}: loginCredentials) => {
    const config: AxiosRequestConfig = {
        headers,
    };
    
    const data = new URLSearchParams({email, password}).toString();

    return api.post(loginEndpoint, data, config);
}

type registerData = {
    email: string,
    username: string,
    password: string,
}

export const register = async ({email, username, password}: registerData) => {
    const config: AxiosRequestConfig = {
        headers,
    };
    
    const data = new URLSearchParams({email, username, password}).toString();

    return api.post(registerEndpoint, data, config);
}