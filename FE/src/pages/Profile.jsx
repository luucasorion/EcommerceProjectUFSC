import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/userService.js";

const mainStyle = {
    backgroundImage: "url('/frutiger-microsoft-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
};

const glassCardStyle = {
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
};

const pfpStyle = {
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    width: 300,
    gap: 15
};

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState({ name: "", email: "" });
    const [isEditing, setIsEditing] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            window.location.href = "/auth";
            return;
        }

        async function loadUser() {
            try {
                const data = await getUser(token);
                setUserInfo({
                    name: data.name || "",
                    email: data.email || ""
                });
            } catch (error) {
                console.error(error);
            }
        }
        loadUser();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/auth";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(token, userInfo);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleEdit = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const getInputStyle = (editing) => ({
        backgroundColor: !editing ? "#e9ecef" : "#fff",
        color: !editing ? "#6c757d" : "#000",
        opacity: !editing ? 0.7 : 1
    });

    return (
        <>
            <nav className="navbar bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        EcommerceProjectUFSC
                    </a>
                    <button className="btn btn-danger btn-frutiger-aero" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <main className="container-fluid pt-5 vh-100" style={mainStyle}>
                <div style={glassCardStyle}>
                    <img
                        src="/pfp.jpg"
                        alt="profile"
                        style={pfpStyle}
                    />

                    <form onSubmit={handleSubmit} style={formStyle}>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={userInfo.name}
                            onChange={handleInputChange}
                            placeholder="Nome"
                            disabled={!isEditing}
                            style={getInputStyle(isEditing)}
                        />

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={userInfo.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            disabled={!isEditing}
                            style={getInputStyle(isEditing)}
                        />

                        {!isEditing ? (
                            <button
                                className="btn btn-warning btn-frutiger-aero text-white"
                                onClick={toggleEdit}
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