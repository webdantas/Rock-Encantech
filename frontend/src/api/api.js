import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        "Content-Type": "application/json",
    },
});

// REQUEST
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// RESPONSE
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error("Não autorizado");
                    break;
                case 500:
                    console.error("Erro interno");
                    break;
                default:
                    console.error("Erro:", error.response.data);
            }
        }

        return Promise.reject(error);
    }
);

export default api;