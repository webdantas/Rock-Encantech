import api from '../api/api';

export const getProducts = async ({
    page = 1,
    search = "",
    category_id = "",
} = {}) => {

    const response = await api.get('/products', {
        params: {
            page,
            search,
            category_id,
        }
    });

    return response.data.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
};