import express, { Application } from "express";
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes'
const cors = require('cors');
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

// Middleware para procesar los cuerpos de solicitudes en JSON
app.use(express.json());

// Configuración personalizada de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Asegúrate de que tu frontend esté corriendo en este puerto
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
  allowedHeaders: 'Content-Type,Authorization', // Headers permitidos
};


  // Aplica CORS con las opciones configuradas
  app.use(cors(corsOptions));
  console.log("Cors activo")
  

app.use('/api', eventRoutes);
app.use('/api', userRoutes);


export default app;