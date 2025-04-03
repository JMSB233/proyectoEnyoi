import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./components/Home";
import ReservasPage from "./pages/ReservasPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Rooms from "./components/Rooms";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);  // Si hay token, está autenticado
    }, []);

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
                <Route path="/home" element={<HomePage isAuthenticated={isAuthenticated} />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reservas" element={<ReservasPage />} />
                <Route path="/rooms" element={<Rooms isAuthenticated={isAuthenticated} />} />
            </Routes>
        </Router>
    );
}

export default App;
