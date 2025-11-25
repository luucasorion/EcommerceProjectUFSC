import { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductByID, getProducts, registerProduct, updateProduct, deleteProduct } from "../api/productService.js";

const pageSize = 8;

const glassStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.4)"
};

const modalOverlayStyle = {
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 9999
};

const modalContentStyle = {
    width: 400,
    borderRadius: 15,
    ...glassStyle,
    backgroundColor: "rgba(255, 255, 255, 0.9)"
};

export function Products() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: ""
    });

    const token = localStorage.getItem("token");
    const totalPages = Math.ceil(totalItems / pageSize);

    const loadProducts = useCallback(async () => {
        try {
            const response = await getProducts(page, pageSize);
            if (!response.ok) {
                toast.error("Erro ao carregar produtos.");
                return;
            }
            const data = await response.json();
            setProducts(data.items);
            setTotalItems(data.totalItems);
        } catch (err) {
            console.error(err);
            toast.error("Erro ao conectar com o servidor.");
        }
    }, [page]);

    useEffect(() => {
        setIsLoggedIn(!!token);
        loadProducts();
    }, [token, loadProducts]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        toast.info("Logout realizado!");
    };

    const clearForm = () => {
        setFormData({ title: "", price: "", description: "" });
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = async () => {
        const { title, price, description } = formData;
        if (!title || !price) return;

        try {
            await registerProduct(token, { title, description, price });
            toast.success("Produto salvo!");
            setShowRegisterModal(false);
            loadProducts();
            clearForm();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleUpdateProduct = async () => {
        const { title, price, description } = formData;
        if (!editingId || !title || !price) return;

        try {
            await updateProduct(token, { id: editingId, title, description, price });
            toast.success("Produto atualizado com sucesso!");
            setShowEditModal(false);
            loadProducts();
            clearForm();
        } catch (err) {
            console.error(err);
            toast.error("Erro ao atualizar produto.");
        }
    };

    const handleDeleteProduct = async () => {
        if (!editingId) return;

        try {
            await deleteProduct(token, editingId);
            toast.success("Produto deletado com sucesso!");
            setShowEditModal(false);
            loadProducts();
            clearForm();
        } catch (err) {
            console.error(err);
            toast.error("Erro ao deletar produto.");
        }
    };

    const handlePlusClick = () => {
        if (!token) {
            window.location.href = "/auth";
            return;
        }
        clearForm();
        setShowRegisterModal(true);
    };

    const handleEdit = async (id) => {
        if (!token) {
            window.location.href = "/auth";
            return;
        }

        try {
            const data = await getProductByID(id);
            setFormData({
                title: data.title || "",
                description: data.description || "",
                price: data.price || ""
            });
            setEditingId(id);
            setShowEditModal(true);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar dados do produto.");
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <header>
                <nav className="navbar bg-body-tertiary fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">EcommerceProjectUFSC</a>
                        <div className="d-flex align-items-center gap-3">
                            <button
                                className="btn btn-outline-primary btn-frutiger-aero"
                                style={{ width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center" }}
                                onClick={handlePlusClick}
                            >
                                +
                            </button>
                            {isLoggedIn && (
                                <button
                                    className="btn btn-outline-danger btn-frutiger-aero"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            )}
                            <a
                                href={isLoggedIn ? "/profile" : "/auth"}
                                style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", display: "block" }}
                            >
                                <img
                                    src="/pfp.jpg"
                                    alt="User"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            <main
                className="container-fluid pt-5 p-4"
                style={{
                    minHeight: "100vh",
                    backgroundImage: "url('/butterfly-background.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    overflowX: "hidden"
                }}
            >
                <div className="row mt-4 pt-4 g-4">
                    {products.map((p) => (
                        <div key={p.id} className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card h-100 shadow-sm" style={glassStyle}>
                                <img
                                    src={p.image || "https://placehold.co/600x400"}
                                    className="card-img-top"
                                    alt={p.title}
                                    style={{ maxHeight: "200px", objectFit: "cover", borderBottom: "1px solid rgba(0,0,0,0.1)" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold">{p.title}</h5>
                                    <p className="card-text text-secondary">{p.description}</p>
                                    <h6 className="fw-bold mt-auto fs-5 text-success">R$ {p.price}</h6>
                                </div>
                                <div className="card-footer text-center bg-transparent border-top-0 pb-3">
                                    <button
                                        className="btn btn-primary w-100 shadow-sm"
                                        onClick={() => handleEdit(p.id)}
                                    >
                                        Editar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="container pb-4 d-flex justify-content-center mt-3">
                    <ul className="pagination shadow-sm">
                        {[...Array(totalPages)].map((_, i) => (
                            <li
                                key={i}
                                className={`page-item ${page === i + 1 ? "active" : ""}`}
                                style={{ cursor: "pointer" }}
                            >
                                <span
                                    className="page-link"
                                    onClick={() => setPage(i + 1)}
                                    style={page !== i + 1 ? { backgroundColor: "rgba(255,255,255,0.8)" } : {}}
                                >
                                    {i + 1}
                                </span>
                            </li>
                        ))}
                    </ul>
                </footer>
            </main>

            {showRegisterModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={modalOverlayStyle}>
                    <div className="card shadow-lg p-4" style={modalContentStyle}>
                        <h5 className="mb-4 fw-bold text-center">Novo Produto</h5>
                        <input type="text" name="title" className="form-control mb-3" placeholder="Título" value={formData.title} onChange={handleInputChange} />
                        <input type="number" name="price" className="form-control mb-3" placeholder="Preço" value={formData.price} onChange={handleInputChange} />
                        <input type="text" name="description" className="form-control mb-3" placeholder="Descrição" value={formData.description} onChange={handleInputChange} />

                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-secondary btn-frutiger-aero" onClick={() => setShowRegisterModal(false)}>Cancelar</button>
                            <button className="btn btn-success px-4 btn-frutiger-aero" onClick={handleAddProduct}>Concluir</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={modalOverlayStyle}>
                    <div className="card shadow-lg p-4" style={modalContentStyle}>
                        <h5 className="mb-4 fw-bold text-center">Editar Produto</h5>
                        <input type="text" name="title" className="form-control mb-3" placeholder="Título" value={formData.title} onChange={handleInputChange} />
                        <input type="number" name="price" className="form-control mb-3" placeholder="Preço" value={formData.price} onChange={handleInputChange} />
                        <input type="text" name="description" className="form-control mb-3" placeholder="Descrição" value={formData.description} onChange={handleInputChange} />

                        <div className="d-flex justify-content-between align-items-center">
                            <button className="btn btn-danger btn-frutiger-aero" onClick={handleDeleteProduct}>Deletar</button>
                            <div className="d-flex gap-2">
                                <button className="btn btn-secondary btn-frutiger-aero" onClick={() => setShowEditModal(false)}>Cancelar</button>
                                <button className="btn btn-success px-4 btn-frutiger-aero" onClick={handleUpdateProduct}>Concluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}