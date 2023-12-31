import axios, {AxiosRequestConfig} from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6060/api/', // port that is used for backend
    withCredentials: true,
})

// user 
export const loginEndpoint = 'user/login';
export const registerEndpoint = 'user/register';

// finance
export const getFinanceEndpoint = 'finance/find';
export const createFinanceEndpoint = 'finance/create';
export const updateFinanceEndpoint = 'finance/update';

// Cookie
function getCookie(name:string) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
  
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
  
    return null;
}

type loginCredentials = {
    email: string;
    password: string;
}

export const login = async ({email, password}: loginCredentials) => {
    const config: AxiosRequestConfig = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        }
    };
    
    const data = new URLSearchParams({email, password}).toString();

    return api.post(loginEndpoint, data, config);
}

type registerData = {
    email: string;
    username: string;
    password: string;
}

export const register = async ({email, username, password}: registerData) => {
    const config: AxiosRequestConfig = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        }
    };
    
    const data = new URLSearchParams({email, username, password}).toString();

    return api.post(registerEndpoint, data, config);
}

export const getAllFinance = async () => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: getCookie('_auth'),
            'content-type': 'application/x-www-form-urlencoded',
        }
    };
    return api.get(getFinanceEndpoint, config);
}

type financeData = {
    finance_budget?: number;
    finance_monthly_budget: number;
    do_warn: boolean;
}

export const createFinance = async ({finance_monthly_budget, do_warn}: financeData) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: getCookie('_auth'),
            'content-type': 'application/x-www-form-urlencoded',
        }
    };

    const data = new URLSearchParams({finance_monthly_budget: String(finance_monthly_budget), do_warn: String(do_warn)}).toString();

    return api.post(createFinanceEndpoint, data, config);
}

export const updateFinance = async ({finance_budget, finance_monthly_budget, do_warn}: financeData) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: getCookie('_auth'),
            'content-type': 'application/x-www-form-urlencoded',
        }
    };

    const data = new URLSearchParams({finance_budget: String(finance_budget), finance_monthly_budget: String(finance_monthly_budget), do_warn: String(do_warn)}).toString();

    return api.put(updateFinanceEndpoint, data, config);
}