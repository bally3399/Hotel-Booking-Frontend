import React, { useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import styles from './Login.module.css';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!form.email) tempErrors.email = 'Email is required';
        if (!form.password) tempErrors.password = 'Password is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const response = await axios.post(
                'https://hotel-booking-management-backend.onrender.com/api/v1/auth',
                form,
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log(typeof response.data)

            let rawResponse = response.data;

            const jsonString = typeof rawResponse === 'string'
                ? rawResponse.split('}{"error"')[0] + '}'
                : JSON.stringify(rawResponse);
            const parsedResponse = JSON.parse(jsonString);

            const { success, data } = parsedResponse;
            console.log(parsedResponse)
            if (!success || !data?.jwtToken) {
                toast.error('Authentication failed or token missing')
                throw new Error('Authentication failed or token missing');
            }

            const token = data.jwtToken;

            localStorage.setItem('token', token);
            localStorage.setItem('user',JSON.stringify(data.user));
            console.log(JSON.parse(localStorage.getItem("user")))
            if (success) {
                const token = data.jwtToken;
                console.log("This is my token", token)
                localStorage.setItem('token', token);

                const decodedToken = jwtDecode(token);
                console.log(decodedToken)
                const role = decodedToken.roles[0];

                toast.success(`Welcome ${form.email}, you have logged in successfully!`, {
                    position: 'top-right',
                    autoClose: 3000,
                });

                if (role === 'ADMIN') {
                    navigate('/admin-dashboard');
                } else if (role === 'USER') {
                    navigate('/user-dashboard');
                }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(message);
            setErrors({ email: message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.backButtonWrapper}>
                <button
                    onClick={() => navigate('/register')}
                    className={styles.backButton}
                    aria-label="Go back to registration"
                >
                    <HiArrowLeft className={styles.backIcon} /> Back
                </button>
            </div>
            <section className={styles.formSection}>
                <div className={styles.formContainer}>
                    <h2 className={styles.title}>Log in</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputField}>
                            <TextField
                                label="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email}
                                className={styles.formField}
                                sx={{
                                    '& label.Mui-focused': { color: '#a47a47' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'black' },
                                        '&:hover fieldset': { borderColor: '#a47a47' },
                                        '&.Mui-focused fieldset': { borderColor: '#a47a47' },
                                    },
                                    marginBottom: '16px',
                                }}
                            />
                        </div>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password}
                            className={styles.formField}
                            sx={{
                                '& label.Mui-focused': { color: '#a47a47' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'black' },
                                    '&:hover fieldset': { borderColor: '#a47a47' },
                                    '&.Mui-focused fieldset': { borderColor: '#a47a47' },
                                },
                                marginBottom: '16px',
                            }}
                        />
                        <div className={styles.submitButtonWrapper}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isLoading}
                                className={styles.submitButton}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                            <div className={styles.loginRedirect}>
                                <p>
                                    Don't have an account?{' '}
                                    <span
                                        onClick={() => navigate('/register')}
                                        className={styles.loginLink}
                                    >
                                        Register
                                    </span>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Login;