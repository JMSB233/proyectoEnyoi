import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
    // Obtener el token del header
    const token = req.header("Authorization");

    // Verificar si no se envió token
    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado. No hay token" });
    }

    try {
        // Extraer el token (se espera formato: "Bearer <token>")
        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ mensaje: "Formato de token inválido" });
        }

        // Verificar el token con la clave secreta
        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);

        // Adjuntar usuario a la request y continuar
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ mensaje: "Token inválido o expirado" });
    }
};

export default authMiddleware;
