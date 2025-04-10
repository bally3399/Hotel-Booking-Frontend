import React, { useState } from "react";
import {TextField, Checkbox, FormControlLabel, Button, MenuItem, FormControl, InputLabel, Select} from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "../register/Register.module.css"


const RegisterAdmin = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
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
        let formErrors = {};
        if (form.password !== form.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match";
        }
        if (!form.agree) {
            formErrors.agree = "You must agree to the terms and conditions";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        const endpoint = "https://hotel-booking-management-backend.onrender.com/api/v1/admin/register";

        try {
            const payload = {
                username: form.username,
                email: form.email,
                password: form.password,
                role: "USER",
            };


            const response = await axios.post(endpoint, payload, {
                headers: { "Content-Type": "application/json" },
            });
            console.log(response.data);
            if (response.data.success ===   true) {
                toast.success(`Welcome ${form.username}, you have signed up successfully!`);
                setTimeout(() => navigate("/login"), 3000);
            } else {
                toast.error("Sign up failed. Please try again.");
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
                    <TextField label="Username" name="username" value={form.username} onChange={handleChange} fullWidth
                               className={styles.formField} sx={{
                        "& label.Mui-focused": {color: "#a47a47"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "black"},
                            "&:hover fieldset": {borderColor: "#a47a47"},
                            "&.Mui-focused fieldset": {borderColor: "#a47a47"},
                        },
                        marginBottom: "16px",
                    }}
                    />
                    <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange}
                               fullWidth className={styles.formField} sx={{
                        "& label.Mui-focused": {color: "#a47a47"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "black"},
                            "&:hover fieldset": {borderColor: "#a47a47"},
                            "&.Mui-focused fieldset": {borderColor: "#a47a47"},
                        },
                        marginBottom: "16px",
                    }}/>
                    <TextField label="Password" name="password" type="password" value={form.password}
                               onChange={handleChange} fullWidth className={styles.formField} sx={{
                        "& label.Mui-focused": {color: "#a47a47"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "black"},
                            "&:hover fieldset": {borderColor: "#a47a47"},
                            "&.Mui-focused fieldset": {borderColor: "#a47a47"},
                        },
                        marginBottom: "16px",

                    }}
                    />
                    <TextField label="Confirm Password" name="confirmPassword" type="password"
                               value={form.confirmPassword} onChange={handleChange} fullWidth
                               className={styles.formField} sx={{
                        "& label.Mui-focused": {color: "#a47a47"},
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {borderColor: "black"},
                            "&:hover fieldset": {borderColor: "#a47a47"},
                            "&.Mui-focused fieldset": {borderColor: "#a47a47"},
                        },
                        marginBottom: "16px",
                    }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="agree"
                                checked={form.agree}
                                onChange={handleChange}
                                sx={{
                                    color: "#a47a47",
                                    "&.Mui-checked": {color: "#a47a47"}
                                }}
                            />
                        }
                        label="I agree to the terms and conditions"
                    />
                    {errors.agree && <p className={styles.errorText}>{errors.agree}</p>}

                    <Button type="submit" variant="contained" fullWidth disabled={isLoading}
                            className={styles.submitButton}>
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </Button>
                    <div className={styles.loginRedirect}>
                        <p>
                            Already signed in?{" "}
                            <span onClick={() => navigate("/login")} className={styles.loginLink}>
                                Login
                            </span>
                        </p>
                    </div>

                </form>
                <ToastContainer position="top-right" autoClose={3000}/>
            </div>
        </div>
    );
};

export default RegisterAdmin;
