"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const router = (0, express_1.Router)();
router.post('/events', eventController_1.EventController.createEvent); // Crear evento
router.get('/events', eventController_1.EventController.getAllEvents); // Obtener todos los eventos
router.post('/events/attendees/:id', eventController_1.EventController.addAttendees);
router.get('/events/:id', eventController_1.EventController.getEventById); // Obtener un evento por ID
router.put('/events/:id', eventController_1.EventController.updateEvent); // Actualizar un evento por ID
router.delete('/events/:id', eventController_1.EventController.deleteEvent); // Eliminar un evento por ID
exports.default = router;
