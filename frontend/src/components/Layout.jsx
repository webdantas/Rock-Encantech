import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

export default function Layout() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <AppBar position="static" style={{ marginBottom: 30 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        E-commerce Catalog
                    </Typography>
                    
                    <Button color="inherit" component={Link} to="/">
                        Produtos
                    </Button>

                    {!token ? (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Cadastro
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" onClick={handleLogout}>
                            Sair
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            
            <Container>
                <Outlet />
            </Container>
        </>
    );
}
