import { useState } from "react";
import { loginUser, registerUser } from "../api/userService.js";
import { ToastContainer, toast } from "react-toastify";


export default function AuthPage() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await loginUser({loginEmail, loginPassword});
            localStorage.setItem("token", data.tokens.accessToken);
            window.location.href = "/";
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
                const data = await registerUser({regName, regEmail, regPassword});
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
                                className="btn btn-outline-success"
                                type="button"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container-fluid pt-5 vh-100">
                <div className="row h-100">
                    <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-start ps-5 bg-light"/>
                    <div className="col-md-6 d-flex justify-content-center align-items-center bg-white p-4">
                        <form className="w-100 w-md-75 shadow p-4 rounded" onSubmit={handleRegister}>
                            <h2 className="mb-4 text-center">Registrar</h2>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Digite seu nome"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="regEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="regEmail"
                                    placeholder="Digite seu email"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="regPassword" className="form-label">Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="regPassword"
                                    placeholder="Crie uma senha"
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Registrar
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );

}
