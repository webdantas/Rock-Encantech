import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { Link, useSearchParams } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Select,
    MenuItem,
    Pagination,
    CircularProgress,
    Button,
} from "@mui/material";

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Sincronizando estados iniciais com a URL
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(searchParams.get('search') || "");
    const [category, setCategory] = useState(searchParams.get('category') || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Atualiza a URL sempre que os filtros mudam
    useEffect(() => {
        const params = {};
        if (page > 1) params.page = page;
        if (search) params.search = search;
        if (category) params.category = category;
        
        setSearchParams(params, { replace: true });
    }, [page, search, category, setSearchParams]);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getProducts({
                page,
                search,
                category,
            });

            const productsData = response?.data?.data || [];
            const lastPage = response?.data?.meta?.last_page || 1;

            setProducts(productsData);
            setTotalPages(lastPage);

        } catch (err) {
            console.error(err);
            setError("Erro ao carregar produtos");
        } finally {
            setLoading(false);
        }
    }, [page, search, category]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await getCategories();
            setCategories(response.data || []);
        } catch (err) {
            console.error(err);
        }
    }, []);

    // Fetch products with debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(timeout);
    }, [fetchProducts]);

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Produtos
            </Typography>

            {/* Filters */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Buscar"
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Select
                        fullWidth
                        value={category}
                        displayEmpty
                        onChange={(e) => {
                            setPage(1);
                            setCategory(e.target.value);
                        }}
                    >
                        <MenuItem value="">Todas Categorias</MenuItem>

                        {Array.isArray(categories) &&
                            categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
            </Grid>

            {/* Loading State */}
            {loading && (
                <div style={{ textAlign: "center", marginTop: 40 }}>
                    <CircularProgress />
                </div>
            )}

            {/* Error Message */}
            {error && (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            )}

            {/* Products Grid */}
            <Grid container spacing={2}>
                {!loading &&
                    Array.isArray(products) &&
                    products.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id} sx={{ display: 'flex' }}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            minHeight: '2rem'
                                        }}
                                    >
                                        {product?.name}
                                    </Typography>

                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{ 
                                            mt: 1,
                                            mb: 2,
                                            flexGrow: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                    >
                                        {product?.description}
                                    </Typography>

                                    <Typography variant="h6" color="primary" sx={{ mt: 'auto' }}>
                                        R$ {product?.price}
                                    </Typography>
                                    
                                    <Button 
                                        component={Link} 
                                        to={`/produto/${product.id}`} 
                                        variant="contained" 
                                        size="small" 
                                        sx={{ mt: 2 }}
                                    >
                                        Ver Detalhes
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            {/* 📄 Paginação */}
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                />
            </div>
        </Container>
    );
}