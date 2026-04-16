import api from '../api/api';

export const getProducts = async ({
    page = 1,
    search = "",
    category = "",
} = {}) => {

    const response = await api.get('/products', {
        params: {
            page,
            search,
            category,
        }
    });

    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
};