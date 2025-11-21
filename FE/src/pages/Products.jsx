import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        setProducts([
            {
                id: 1,
                name: "Notebook Gamer",
                price: 4500,
                description: "Alto desempenho para jogos modernos.",
                image: "https://placehold.co/600x400"
            },
            {
                id: 2,
                name: "Celular Ultra",
                price: 2999,
                description: "Câmera excelente e bateria de longa duração.",
                image: "https://placehold.co/600x400"
            },
            {
                id: 3,
                name: "Teclado Mecânico",
                price: 399,
                description: "Switches confiáveis e iluminação RGB.",
                image: "https://placehold.co/600x400"
            }
        ]);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        toast.info("Logout realizado!");
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

                        <div className="d-flex align-items-center gap-3">

                            {isLoggedIn && (
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            )}

                            <a
                                href={isLoggedIn ? "/profile" : "/auth"}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    display: "block"
                                }}
                            >
                                <img
                                    src="/pfp.jpg"
                                    alt="User"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container-fluid pt-5 vh-100">
                <div className="row mt-4">
                    {products.map((p) => (
                        <div key={p.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img src={p.image} className="card-img-top" alt={p.name} />

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <h6 className="fw-bold mt-auto">R$ {p.price}</h6>
                                </div>

                                <div className="card-footer text-center">
                                    <button className="btn btn-primary w-100">
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
