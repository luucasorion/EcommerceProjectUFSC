import { useState } from "react";
import { loginUser, registerUser } from "../api/userService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mainStyle = {
    backgroundImage: "url('/frutiger-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
};

const glassFormStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.4)"
};

export default function AuthPage() {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        try {
            const data = await loginUser(loginData);
            localStorage.setItem("token", data.tokens.accessToken);
            window.location.href = "/";
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(registerData);
            localStorage.setItem("token", data.tokens.accessToken);
            window.location.href = "/";
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

            <header>
                <nav className="navbar bg-body-tertiary fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            EcommerceProjectUFSC
                        </a>

                        <div className="d-flex gap-2">
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                            />
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                            />
                            <button
                                className="btn btn-outline-success btn-frutiger-aero"
                                type="button"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container-fluid pt-5 vh-100" style={mainStyle}>
                <div className="row h-100">
                    <div className="col-md-6 d-none d-md-block"></div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
                        <form
                            className="w-100 w-md-75 shadow p-4 rounded-4"
                            onSubmit={handleRegister}
                            style={glassFormStyle}
                        >
                            <h2 className="mb-4 text-center">Registrar</h2>

                            <div className="mb-3">
                                <label htmlFor="regName" className="form-label fw-semibold">Nome</label>
                                <input
                                    type="text"
                                    className="form-control bg-white bg-opacity-50"
                                    id="regName"
                                    name="name"
                                    placeholder="Digite seu nome"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="regEmail" className="form-label fw-semibold">Email</label>
                                <input
                                    type="email"
                                    className="form-control bg-white bg-opacity-50"
                                    id="regEmail"
                                    name="email"
                                    placeholder="Digite seu email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="regPassword" className="form-label fw-semibold">Senha</label>
                                <input
                                    type="password"
                                    className="form-control bg-white bg-opacity-50"
                                    id="regPassword"
                                    name="password"
                                    placeholder="Crie uma senha"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100 btn-frutiger-aero">
                                Registrar
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}