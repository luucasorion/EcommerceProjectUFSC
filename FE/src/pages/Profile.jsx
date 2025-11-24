import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/userService.js";

export default function ProfilePage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            window.location.href = "/auth";
            return;
        }

        getUser(token).then(data => {
            setName(data.name || "");
            setEmail(data.email || "");
        });
    }, [token]);

    function handleSubmit(e) {
        e.preventDefault();
        updateUser(token, { name, email }).then(() => {
            setIsEditing(false);
        });
    }

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/auth";
    }

    function handleEditClick(e) {
        e.preventDefault();
        setIsEditing(true);
    }

    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        EcommerceProjectUFSC
                    </a>
                    <button className="btn btn-danger btn-frutiger-aero" onClick={logout}>
                        Logout
                    </button>
                </div>
            </nav>

            <main
                className="container-fluid pt-5 vh-100"
                style={{
                    backgroundImage: "url('/frutiger-microsoft-background.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}
            >
                <div
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        backdropFilter: "blur(10px)",
                        padding: "40px",
                        borderRadius: "20px",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "100px",
                        gap: 20
                    }}
                >
                    <img
                        src="/pfp.jpg"
                        alt="profile"
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "3px solid white",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                        }}
                    />

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: 300,
                            gap: 15
                        }}
                    >
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome"
                            disabled={!isEditing}
                            style={{
                                backgroundColor: !isEditing ? "#e9ecef" : "#fff",
                                color: !isEditing ? "#6c757d" : "#000",
                                opacity: !isEditing ? 0.7 : 1
                            }}
                        />

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            disabled={!isEditing}
                            style={{
                                backgroundColor: !isEditing ? "#e9ecef" : "#fff",
                                color: !isEditing ? "#6c757d" : "#000",
                                opacity: !isEditing ? 0.7 : 1
                            }}
                        />

                        {!isEditing ? (
                            <button
                                className="btn btn-warning btn-frutiger-aero text-white"
                                onClick={handleEditClick}
                                style={{ fontWeight: "bold" }}
                            >
                                Editar
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary btn-frutiger-aero"
                                type="submit"
                            >
                                Concluir
                            </button>
                        )}
                    </form>
                </div>
            </main>
        </>
    );
}