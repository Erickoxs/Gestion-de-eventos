import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { Event } from '../models/eventModel';

export class EventController {
  // Crear un nuevo evento
  static async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, date, location, organizer, attendees, category, imageURL } = req.body;

      // Validar campos obligatorios
      if (!title || !description || !date || !location || !organizer || !category) {
        res.status(400).json({ message: 'Todos los campos obligatorios deben completarse.' });
        return;
      }

      // Verificar que `organizer` sea un ObjectId válido
      if (!Types.ObjectId.isValid(organizer)) {
        res.status(400).json({ message: 'El organizador debe ser un ID válido.' });
        return;
      }

      // Crear y guardar el nuevo evento
      const nuevoEvento = new Event({
        title,
        description,
        date,
        location,
        organizer,
        attendees: attendees || [],
        category,
        imageURL,
      });

      const eventoGuardado = await nuevoEvento.save();
      res.status(201).json(eventoGuardado);
    } catch (err) {
      console.error('Error al crear el evento:', err);
      res.status(500).json({ message: 'Error al crear el evento.' });
    }
  }

  // Obtener todos los eventos
  static async getAllEvents(req: Request, res: Response): Promise<void> {
    try {
      const eventos = await Event.find()
        .populate('organizer', 'name') // Cargar solo el campo `name` del organizador
        .exec();

      res.status(200).json(eventos);
    } catch (err) {
      console.error('Error al obtener los eventos:', err);
      res.status(500).json({ message: 'Error al obtener los eventos.' });
    }
  }

  // Obtener un evento por ID
  static async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Validar el ID
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'ID de evento no válido.' });
        return;
      }

      const evento = await Event.findById(id).populate('organizer', 'name email');
      if (!evento) {
        res.status(404).json({ message: 'Evento no encontrado.' });
        return;
      }

      res.status(200).json(evento);
    } catch (err) {
      console.error('Error al obtener el evento:', err);
      res.status(500).json({ message: 'Error al obtener el evento.' });
    }
  }

  // Actualizar un evento por ID
  static async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, date, location, organizer, attendees, category, imageURL } = req.body;

      // Validar el ID
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'ID de evento no válido.' });
        return;
      }

      const eventoActualizado = await Event.findByIdAndUpdate(
        id,
        { title, description, date, location, organizer, attendees, category, imageURL },
        { new: true, runValidators: true }
      );

      if (!eventoActualizado) {
        res.status(404).json({ message: 'Evento no encontrado.' });
        return;
      }

      res.status(200).json(eventoActualizado);
    } catch (err) {
      console.error('Error al actualizar el evento:', err);
      res.status(500).json({ message: 'Error al actualizar el evento.' });
    }
  }

  // Agregar asistentes a un evento
  static async addAttendees(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      // Validar entradas
      if (!name) {
        res.status(400).json({ message: 'El nombre del asistente es obligatorio.' });
        return;
      }
  
      // Validar el ID del evento
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'ID del evento no válido.' });
        return;
      }
  
      // Buscar el evento
      const event = await Event.findById(id);
      if (!event) {
        res.status(404).json({ message: 'Evento no encontrado.' });
        return;
      }
  
      // Verificar si el usuario ya está en la lista de asistentes
      const existingAttendee = event.attendees.find(
        (attendee: { name: string }) => attendee.name === name
      );
  
      if (existingAttendee) {
        res.status(400).json({ message: 'El usuario ya se encuentra en la lista de asistentes.' });
        return;
      }
  
      // Agregar al usuario a la lista de asistentes
      event.attendees.push({ name });
      await event.save();
  
      res.status(200).json({
        message: 'Usuario agregado a la lista de asistentes.',
        attendees: event.attendees,
      });
    } catch (err) {
      console.error('Error al agregar asistente:', err);
      res.status(500).json({ message: 'Error del servidor.' });
    }
  }

  // Eliminar un evento por ID
  static async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Validar el ID
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'ID de evento no válido.' });
        return;
      }

      const eventoEliminado = await Event.findByIdAndDelete(id);
      if (!eventoEliminado) {
        res.status(404).json({ message: 'Evento no encontrado.' });
        return;
      }

      res.status(200).json({ message: 'Evento eliminado con éxito.' });
    } catch (err) {
      console.error('Error al eliminar el evento:', err);
      res.status(500).json({ message: 'Error al eliminar el evento.' });
    }
  }
}
