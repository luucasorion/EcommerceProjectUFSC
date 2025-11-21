import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth.jsx";
import ProductsPage from "./pages/Products.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
