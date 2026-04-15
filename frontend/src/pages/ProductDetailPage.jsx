import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CircularProgress, Button, Box } from '@mui/material';
import { getProductById } from '../services/productService';

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Produto não encontrado.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Container sx={{ mt: 5, textAlign: 'center' }}><CircularProgress /></Container>;
    if (error) return <Container sx={{ mt: 5 }}><Typography color="error">{error}</Typography></Container>;
    if (!product) return null;

    return (
        <Container sx={{ mt: 5 }}>
            <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
                Voltar
            </Button>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        Categoria: {product.category?.name || 'Sem Categoria'}
                    </Typography>
                    <Box sx={{ my: 3 }}>
                        <Typography variant="body1">
                            {product.description || 'Nenhuma descrição disponível para este produto.'}
                        </Typography>
                    </Box>
                    <Typography variant="h5" color="primary">
                        R$ {product.price}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}
