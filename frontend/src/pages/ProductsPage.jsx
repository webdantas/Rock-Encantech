import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Select,
    MenuItem,
    Pagination
} from '@mui/material';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await getProducts({
                page,
                search,
                category
            });

            setProducts(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, search, category]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Produtos
            </Typography>

            {/* Filtros */}
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Buscar"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="">Todas Categorias</MenuItem>
                        <MenuItem value="1">Eletrônicos</MenuItem>
                        <MenuItem value="2">Roupas</MenuItem>
                        <MenuItem value="3">Livros</MenuItem>
                    </Select>
                </Grid>
            </Grid>

            {/* Lista de Produtos */}
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={4} key={product.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {product.name}
                                </Typography>
                                <Typography>
                                    {product.description}
                                </Typography>
                                <Typography>
                                    R$ {product.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Paginação */}
            <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                style={{ marginTop: 20 }}
            />
        </Container>
    );
}
