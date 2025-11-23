import { useState } from "react";
import { loginUser, registerUser } from "../api/userService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage() {
    // ... (todos os states e handlers permanecem iguais)
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
                {/* Navbar permanece igual */}
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

            {/* MAIN: A imagem de fundo é aplicada aqui para cobrir tudo */}
            <main
                className="container-fluid pt-5 vh-100"
                style={{
                    backgroundImage: "url('/frutiger-background.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {/* Voltamos com a estrutura de ROW para dividir a tela */}
                <div className="row h-100">
                    {/* Coluna da Esquerda: Fica vazia apenas para ocupar espaço */}
                    <div className="col-md-6 d-none d-md-block">
                        {/* Vazio */}
                    </div>

                    {/* Coluna da Direita: Contém o formulário */}
                    {/* Importante: Removemos o 'bg-white' que existia aqui no original */}
                    <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
                        <form
                            className="w-100 w-md-75 shadow p-4 rounded-4"
                            onSubmit={handleRegister}
                            style={{
                                // Efeito de vidro aplicado no formulário
                                backgroundColor: "rgba(255, 255, 255, 0.75)", // Um pouco mais opaco para leitura
                                backdropFilter: "blur(15px)", // Aumentei um pouco o desfoque
                                WebkitBackdropFilter: "blur(15px)",
                                border: "1px solid rgba(255, 255, 255, 0.4)"
                            }}
                        >
                            <h2 className="mb-4 text-center">Registrar</h2>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label fw-semibold">Nome</label>
                                <input
                                    type="text"
                                    className="form-control bg-white bg-opacity-50" // Deixa o input levemente transparente também
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