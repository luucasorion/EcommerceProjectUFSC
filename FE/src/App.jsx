import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

async function loginUser(email, password) {
    const response = await fetch('ecommerceprojectufsc-cfh3hqf0brgthrd9.eastus2-01.azurewebsites.net/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const errorMessage = data.errors?.[0] || 'Erro ao fazer login';
        throw new Error(errorMessage);
    }
    return data;
}

async function registerUser(name, email, password) {
    const response = await fetch('ecommerceprojectufsc-cfh3hqf0brgthrd9.eastus2-01.azurewebsites.net/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const errorMessage = data.errors?.[0] || 'Erro ao registrar usuário';
        throw new Error(errorMessage);
    }
    return data;
}

function App() {
    const [, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) setToken(savedToken);
    }, []);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    const handleLogin = async () => {
        try {
            const data = await loginUser(loginEmail, loginPassword);
            localStorage.setItem('token', data.tokens.accessToken);
            setToken(data.tokens.accessToken);
            toast.success('Login realizado com sucesso!');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(regName, regEmail, regPassword);
            localStorage.setItem('token', data.tokens.accessToken);
            setToken(data.tokens.accessToken);
            toast.success('Registro realizado com sucesso!');
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
                        <a className="navbar-brand">EcommerceProjectUFSC</a>

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

                    <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-start ps-5 bg-light">
                        <h1 className="display-5 fw-bold">Bem-vindo ao Ecommerce UFSC</h1>
                        <p className="lead">Crie sua conta e aproveite nossas ofertas!</p>
                    </div>

                    <div className="col-md-6 d-flex justify-content-end align-items-center bg-white pe-5">
                        <form className="w-75 shadow p-4 rounded" onSubmit={handleRegister}>
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

export default App;
