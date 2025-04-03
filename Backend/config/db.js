import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

pool.connect()
    .then(() => console.log("Conectado a la base de datos"))
    .catch(err => console.error("Error en la conexión a la BD", err));

export default pool;
