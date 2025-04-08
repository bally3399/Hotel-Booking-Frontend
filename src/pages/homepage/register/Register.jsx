import React, { useState } from "react";
import {TextField, Checkbox, FormControlLabel, Button, MenuItem, FormControl, InputLabel, Select} from "@mui/material";
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
        role: ""
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState("Admin");


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



    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const payload = {
                username: form.username,
                email: form.email,
                password: form.password,
                role: form.role,
            };


            const response = await axios.post("https://hotel-booking-backend-2sa9.onrender.com/api/auth/admin/register", payload, {
                headers: { "Content-Type": "application/json" },
            });

            console.log(response);
            
            if (response.data === "User registered successfully") {
                toast.success(`Welcome ${form.username}, you have signed up successfully!`);
                setTimeout(() => navigate("/login"), 3000);
            } else if(response.status == 200) {
                toast.success("Admin created subccc");
                navigate("/login");
            }
        } catch (error) {
            toast.error("Sign up failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const payload = {
                username: form.username,
                email: form.email,
                password: form.password,
                role: form.role,
            };


            const response = await axios.post("https://hotel-booking-backend-2sa9.onrender.com/api/auth/user/register", payload, {
                headers: { "Content-Type": "application/json" },
            });

            console.log(response);
            
            if (response.data === "User registered successfully") {
                toast.success(`Welcome ${form.username}, you have signed up successfully!`);
                setTimeout(() => navigate("/login"), 3000);
            } else if(response.status === 200) {
                toast.success("User created successfully!");
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
                <div>Choose Role: <button onClick={() => setRole("Admin")}>Admin</button> or <button onClick={() => setRole("User")}>User</button></div>

                <form onSubmit={role === "Admin" ? handleAdminSubmit : handleUserSubmit}>
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
                    <FormControl fullWidth className={styles.formField}
                                 sx={{
                                     "& label.Mui-focused": { color: "#a47a47" },
                                     "& .MuiOutlinedInput-root": {
                                         "& fieldset": { borderColor: "black" },
                                         "&:hover fieldset": { borderColor: "#a47a47" },
                                         "&.Mui-focused fieldset": { borderColor: "#a47a47" },
                                     },
                                     marginBottom: "16px",
                                 }}
                    >
                    </FormControl>
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

export default GetStarted;
