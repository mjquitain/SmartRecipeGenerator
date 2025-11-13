import { Box, Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        let isValid = true;

        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address (e.g., user@domain.com)');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!isValid) {
            return;
        }
        console.log('Login attempt with:', { email, password });
        navigate({ to: '/dashboard' })
    };

    return (
        <Box
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8f9f8 0%, #e8f0e8 100%)',
            }}
        >
            <Container size={480} my={40}>
                <Paper
                    radius="md"
                    p="xl"
                    withBorder
                    style={{
                        backgroundColor: 'white',
                        borderColor: '#8a9a7b',
                        borderWidth: '2px',
                    }}
                >
                    <Title
                        order={2}
                        ta="center"
                        mb={5}
                        style={{
                            color: '#2d3319',
                            fontWeight: 700,
                            fontSize: '28px',
                        }}
                    >
                        Welcome Back! 🌱
                    </Title>

                    <Text c="dimmed" size="sm" ta="center" mb={30} style={{ color: '#5a6b4f' }}>
                        Smart Recipe Generator
                    </Text>

                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Email"
                            placeholder="your@email.com"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.currentTarget.value)
                                setEmailError('');
                            }}
                            error={emailError}
                            styles={{
                                label: {
                                    color: '#2d3319',
                                    fontWeight: 500,
                                    marginBottom: '8px',
                                },
                                input: {
                                    borderColor: '#8a9a7b',
                                    '&:focus': {
                                        borderColor: '#6b7c5e',
                                    },
                                },
                            }}
                            mb="md"
                        />

                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            styles={{
                                label: {
                                    color: '#2d3319',
                                    fontWeight: 500,
                                    marginBottom: '8px',
                                },
                                input: {
                                    borderColor: '#8a9a7b',
                                    '&:focus': {
                                        borderColor: '#6b7c5e',
                                    },
                                },
                            }}
                            mb="md"
                        />

                        <Button
                            fullWidth
                            mt="xl"
                            type="submit"
                            styles={{
                                root: {
                                    backgroundColor: '#8a9a7b',
                                    '&:hover': {
                                        backgroundColor: '#6b7c5e',
                                    },
                                },
                            }}
                        >
                            Sign in
                        </Button>
                    </form>

                    <Text ta="center" mt="md" size="sm" style={{ color: '#666' }}>
                        Don't have an account?{' '}
                        <Text
                            component="a"
                            href="#"
                            style={{
                                color: '#6b7c5e',
                                fontWeight: 500,
                                textDecoration: 'none',
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            Sign up
                        </Text>
                    </Text>
                </Paper>

                <Text ta="center" mt="lg" size="xs" style={{ color: '#5a6b4f' }}>
                    Reduce food waste, one recipe at a time 🍳
                </Text>
            </Container>
        </Box>
    );
}

export default LoginPage;