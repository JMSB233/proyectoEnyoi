import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reservasRoutes from "./routes/reservasRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);  // Ahora tenemos una ruta protegida
app.use("/api/reservas", reservasRoutes);   // Agregar la ruta de reservas

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
