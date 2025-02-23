"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors = require('cors');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware para procesar los cuerpos de solicitudes en JSON
app.use(express_1.default.json());
// Configuración personalizada de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Asegúrate de que tu frontend esté corriendo en este puerto
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Headers permitidos
};
// Aplica CORS con las opciones configuradas
app.use(cors(corsOptions));
console.log("Cors activo");
app.use('/api', eventRoutes_1.default);
app.use('/api', userRoutes_1.default);
exports.default = app;
