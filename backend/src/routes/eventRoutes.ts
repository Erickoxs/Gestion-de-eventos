import { Router } from 'express';
import { EventController } from '../controllers/eventController';

const router = Router();

router.post('/events', EventController.createEvent); // Crear evento
router.get('/events', EventController.getAllEvents); // Obtener todos los eventos
router.post('/events/attendees/:id', EventController.addAttendees);
router.get('/events/:id', EventController.getEventById); // Obtener un evento por ID
router.put('/events/:id', EventController.updateEvent); // Actualizar un evento por ID
router.delete('/events/:id', EventController.deleteEvent); // Eliminar un evento por ID

export default router;
