import React, { useState } from "react";
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "../register/Register.module.css";

const GetStarted = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        agree: false,
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.username.trim()) newErrors.username = "Username is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        if (!form.password) newErrors.password = "Password is required";
        if (!form.confirmPassword)
            newErrors.confirmPassword = "Please confirm your password";
        if (form.password && form.confirmPassword && form.password !== form.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        if (!form.role) newErrors.role = "Please select a role";
        if (!form.agree)
            newErrors.agree = "You must agree to the terms and conditions";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        const payload = {
            username: form.username,
            email: form.email,
            password: form.password,
            role: form.role,
        };

        const url =
            form.role === "Admin"
                ? "https://hotel-booking-backend-2sa9.onrender.com/api/auth/admin/register"
                : "https://hotel-booking-backend-2sa9.onrender.com/api/auth/user/register";

        try {
            const response = await axios.post(url, payload, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data === "User registered successfully") {
                toast.success(
                    `Welcome ${form.username}, you have signed up successfully!`
                );
                setTimeout(() => navigate("/login"), 3000);
            } else if (response.status === 200) {
                toast.success(`${form.role} created successfully!`);
                navigate("/login");
            }
        } catch (error) {
            toast.error("Sign up failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.regContainer}>
            <div className={styles.backButton} onClick={() => navigate("/")}>
                <HiArrowLeft className="mr-2" /> Back
            </div>
            <div className={styles.regCard}>
                <h2 className={styles.regTitle}>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username}
                        sx={{
                            marginBottom: "16px",
                            "& label.Mui-focused": { color: "#a47a47" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "#a47a47" },
                                "&.Mui-focused fieldset": { borderColor: "#a47a47" },
                            },
                        }}
                    />

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                            marginBottom: "16px",
                            "& label.Mui-focused": { color: "#a47a47" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "#a47a47" },
                                "&.Mui-focused fieldset": { borderColor: "#a47a47" },
                            },
                        }}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{
                            marginBottom: "16px",
                            "& label.Mui-focused": { color: "#a47a47" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "#a47a47" },
                                "&.Mui-focused fieldset": { borderColor: "#a47a47" },
                            },
                        }}
                    />

                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        sx={{
                            marginBottom: "16px",
                            "& label.Mui-focused": { color: "#a47a47" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "#a47a47" },
                                "&.Mui-focused fieldset": { borderColor: "#a47a47" },
                            },
                        }}
                    />

                    <FormControl
                        fullWidth
                        error={!!errors.role}
                        sx={{
                            marginBottom: "16px",
                            "& label.Mui-focused": { color: "#a47a47" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "#a47a47" },
                                "&.Mui-focused fieldset": { borderColor: "#a47a47" },
                            },
                        }}
                    >
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            label="Role"
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="User">User</MenuItem>
                        </Select>
                        {errors.role && (
                            <p style={{ color: "#d32f2f", marginTop: "4px", fontSize: "0.75rem" }}>
                                {errors.role}
                            </p>
                        )}
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="agree"
                                checked={form.agree}
                                onChange={handleChange}
                                sx={{
                                    color: "#a47a47",
                                    "&.Mui-checked": { color: "#a47a47" },
                                }}
                            />
                        }
                        label="I agree to the terms and conditions"
                    />
                    {errors.agree && (
                        <p style={{ color: "#d32f2f", marginTop: "4px", fontSize: "0.75rem" }}>
                            {errors.agree}
                        </p>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </Button>

                    <div className={styles.loginRedirect}>
                        <p>
                            Already signed in?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className={styles.loginLink}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </form>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default GetStarted;
