import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

async function loginUser(email, password) {
    const response = await fetch('https://localhost:7273/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    if (!response.ok) throw new Error('Erro ao fazer login')
    return await response.json()
}

function App() {
    const [BearerToken, setBearerToken] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const data = await loginUser(email, password);

        setBearerToken(data.tokens.accessToken);
        console.log(BearerToken);
    }

    return (
        <nav className="navbar bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand">EcommerceProjectUFSC</a>
                <div className="d-flex">
                    <input
                        className="form-control me-2"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // 🔹 pega o valor
                    />
                    <input
                        className="form-control me-2"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // 🔹 pega o valor
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
    )
}

export default App
