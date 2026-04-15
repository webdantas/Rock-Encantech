import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { login } from '../services/authService';

export default function LoginPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            await login(credentials);
            // Redirecionando e forçando refresh para atualizar a topbar (Login/Sair)
            window.location.href = '/'; 
        } catch (err) {
            setError('Credenciais inválidas ou erro no servidor.');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="E-mail"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Entrar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
