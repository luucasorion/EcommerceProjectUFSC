import { useState } from "react";
import { loginUser, registerUser } from "../api/userService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await loginUser({
                email: loginEmail,
                password: loginPassword
            });

            localStorage.setItem("token", data.tokens.accessToken);
            window.location.href = "/";
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const data = await registerUser({
                title: regName,
                email: regEmail,
                password: regPassword
            });

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

                        <div className="d-flex">
                            <input
                                className="form-control me-2"
                                type="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <input
                                className="form-control me-2"
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
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

            <main
                className="container-fluid pt-5 vh-100"
                style={{
                    backgroundImage: "url('/frutiger-background.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="row h-100">
                    <div className="col-md-6 d-none d-md-block">
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
                        <form
                            className="w-100 w-md-75 shadow p-4 rounded-4"
                            onSubmit={handleRegister}
                            style={{

                                backgroundColor: "rgba(255, 255, 255, 0.75)",
                                backdropFilter: "blur(15px)",
                                WebkitBackdropFilter: "blur(15px)",
                                border: "1px solid rgba(255, 255, 255, 0.4)"
                            }}
                        >
                            <h2 className="mb-4 text-center">Registrar</h2>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label fw-semibold">Nome</label>
                                <input
                                    type="text"
                                    className="form-control bg-white bg-opacity-50"
                                    id="name"
                                    placeholder="Digite seu nome"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="regEmail" className="form-label fw-semibold">Email</label>
                                <input
                                    type="email"
                                    className="form-control bg-white bg-opacity-50"
                                    id="regEmail"
                                    placeholder="Digite seu email"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="regPassword" className="form-label fw-semibold">Senha</label>
                                <input
                                    type="password"
                                    className="form-control bg-white bg-opacity-50"
                                    id="regPassword"
                                    placeholder="Crie uma senha"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
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