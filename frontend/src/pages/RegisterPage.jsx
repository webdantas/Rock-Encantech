import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { register } from '../services/authService';

export default function RegisterPage() {
    const [userData, setUserData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.password_confirmation) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            setError(null);
            await register(userData);
            window.location.href = '/';
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Erro ao registrar. Verifique os dados.';
            setError(errorMsg);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h5">
                    Criar Conta
                </Typography>
                {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nome"
                        name="name"
                        autoFocus
                        value={userData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="E-mail"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha (mínimo 6 caracteres)"
                        type="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password_confirmation"
                        label="Confirme a Senha"
                        type="password"
                        value={userData.password_confirmation}
                        onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Cadastrar-se
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
