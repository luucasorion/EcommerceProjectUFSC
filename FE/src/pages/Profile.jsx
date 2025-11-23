import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/userService.js";

export default function ProfilePage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            window.location.href = "/auth";
            return;
        }

        getUser(token).then(data => {
            setName(data.title || "");
            setEmail(data.email || "");
        });
    }, [token]);

    function handleSubmit(e) {
        e.preventDefault();
        updateUser(token, { title: name, email: email }).then(() => {
            window.location.href = "/";
        });
    }

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/auth";
    }

    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        EcommerceProjectUFSC
                    </a>

                    <button className="btn btn-danger" onClick={logout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 100,
                    gap: 10
                }}
            >
                <img
                    src="/pfp.jpg"
                    alt="profile"
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        objectFit: "cover"
                    }}
                />

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: 300,
                        gap: 10
                    }}
                >
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                    />

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    <button className="btn btn-primary" type="submit">
                        Concluir
                    </button>
                </form>
            </div>
        </>
    );
}
