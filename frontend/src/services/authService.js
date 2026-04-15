import api from '../api/api';

export const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data?.data?.token) {
        localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/register', userData);
    if (response.data?.data?.token) {
        localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};
