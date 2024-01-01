import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useAuth } from '../../../AuthContext';

export default function LoginView() {
    const { login, user } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        // Call the login function with the entered username and password
        login(username, password);
        console.log("user", user)
        if (user) {
            // Redirect to the desired page (e.g., homepage)
            navigate('/revenue');
        }
    };

    return (
        <Box
            sx={{
                height: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/assets/background/overlay_4.jpg')`,
                backgroundSize: 'cover',
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            />

            <Card
                sx={{
                    p: 5,
                    width: 1,
                    maxWidth: 420,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4">Login</Typography>

                <Stack spacing={2} mt={2} mb={5}>
                    <TextField
                        name="username"
                        label="Username"
                        fullWidth
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                <Button
                    fullWidth
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={handleLogin}
                    sx={{ mb: 2 }}
                >
                    Login
                </Button>
            </Card>
        </Box>
    );
}
