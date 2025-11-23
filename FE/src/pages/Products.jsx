import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {registerProduct} from "../api/productService.js";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImage, setNewImage] = useState("");

    useEffect(() => {
        setIsLoggedIn(!!token);

        setProducts([
            {
                id: 1,
                title: "Notebook Gamer",
                price: 4500,
                description: "Alto desempenho para jogos modernos.",
                image: "https://placehold.co/600x400"
            },
            {
                id: 2,
                title: "Celular Ultra",
                price: 2999,
                description: "Câmera excelente e bateria de longa duração.",
                image: "https://placehold.co/600x400"
            },
            {
                id: 3,
                title: "Teclado Mecânico",
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

    const handleAddProduct = async () => {
        if (!title || !newPrice) return;

        try {
            await registerProduct( token, {
                title: title,
                description: newDescription,
                price: newPrice,
            });

        } catch (err) {
            toast.error(err.message);
        }


        setShowModal(false);

        setTitle("");
        setNewPrice("");
        setNewDescription("");
        setNewImage("");

        toast.success("Produto adicionado!");

    };

    const handlePlusClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth";
            return;
        }
        setShowModal(true);
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
                            <button
                                className="btn btn-outline-primary"
                                style={{
                                    width: 40,
                                    height: 40,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                                onClick={handlePlusClick}
                            >
                                +
                            </button>

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
                                <img src={p.image} className="card-img-top" alt={p.title} />

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{p.title}</h5>
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

            {showModal && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        backdropFilter: "blur(5px)",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        zIndex: 9999
                    }}
                >
                    <div className="card shadow-lg p-3" style={{ width: 400, borderRadius: 15 }}>
                        <h5 className="mb-3">Novo Produto</h5>

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Titulo"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Preço"
                            value={newPrice}
                            onChange={e => setNewPrice(e.target.value)}
                        />

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Descrição"
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                        />

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Imagem (URL opcional)"
                            value={newImage}
                            onChange={e => setNewImage(e.target.value)}
                        />

                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>

                            <button className="btn btn-success" onClick={handleAddProduct}>
                                Concluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
