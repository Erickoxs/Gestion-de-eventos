"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const mongoose_1 = require("mongoose");
const eventModel_1 = require("../models/eventModel");
class EventController {
    // Crear un nuevo evento
    static createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, date, location, organizer, attendees, category, imageURL } = req.body;
                // Validar campos obligatorios
                if (!title || !description || !date || !location || !organizer || !category) {
                    res.status(400).json({ message: 'Todos los campos obligatorios deben completarse.' });
                    return;
                }
                // Verificar que `organizer` sea un ObjectId válido
                if (!mongoose_1.Types.ObjectId.isValid(organizer)) {
                    res.status(400).json({ message: 'El organizador debe ser un ID válido.' });
                    return;
                }
                // Crear y guardar el nuevo evento
                const nuevoEvento = new eventModel_1.Event({
                    title,
                    description,
                    date,
                    location,
                    organizer,
                    attendees: attendees || [],
                    category,
                    imageURL,
                });
                const eventoGuardado = yield nuevoEvento.save();
                res.status(201).json(eventoGuardado);
            }
            catch (err) {
                console.error('Error al crear el evento:', err);
                res.status(500).json({ message: 'Error al crear el evento.' });
            }
        });
    }
    // Obtener todos los eventos
    static getAllEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventos = yield eventModel_1.Event.find()
                    .populate('organizer', 'name') // Cargar solo el campo `name` del organizador
                    .exec();
                res.status(200).json(eventos);
            }
            catch (err) {
                console.error('Error al obtener los eventos:', err);
                res.status(500).json({ message: 'Error al obtener los eventos.' });
            }
        });
    }
    // Obtener un evento por ID
    static getEventById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Validar el ID
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ message: 'ID de evento no válido.' });
                    return;
                }
                const evento = yield eventModel_1.Event.findById(id).populate('organizer', 'name email');
                if (!evento) {
                    res.status(404).json({ message: 'Evento no encontrado.' });
                    return;
                }
                res.status(200).json(evento);
            }
            catch (err) {
                console.error('Error al obtener el evento:', err);
                res.status(500).json({ message: 'Error al obtener el evento.' });
            }
        });
    }
    // Actualizar un evento por ID
    static updateEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, description, date, location, organizer, attendees, category, imageURL } = req.body;
                // Validar el ID
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ message: 'ID de evento no válido.' });
                    return;
                }
                const eventoActualizado = yield eventModel_1.Event.findByIdAndUpdate(id, { title, description, date, location, organizer, attendees, category, imageURL }, { new: true, runValidators: true });
                if (!eventoActualizado) {
                    res.status(404).json({ message: 'Evento no encontrado.' });
                    return;
                }
                res.status(200).json(eventoActualizado);
            }
            catch (err) {
                console.error('Error al actualizar el evento:', err);
                res.status(500).json({ message: 'Error al actualizar el evento.' });
            }
        });
    }
    // Agregar asistentes a un evento
    static addAttendees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name } = req.body;
                // Validar entradas
                if (!name) {
                    res.status(400).json({ message: 'El nombre del asistente es obligatorio.' });
                    return;
                }
                // Validar el ID del evento
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ message: 'ID del evento no válido.' });
                    return;
                }
                // Buscar el evento
                const event = yield eventModel_1.Event.findById(id);
                if (!event) {
                    res.status(404).json({ message: 'Evento no encontrado.' });
                    return;
                }
                // Verificar si el usuario ya está en la lista de asistentes
                const existingAttendee = event.attendees.find((attendee) => attendee.name === name);
                if (existingAttendee) {
                    res.status(400).json({ message: 'El usuario ya se encuentra en la lista de asistentes.' });
                    return;
                }
                // Agregar al usuario a la lista de asistentes
                event.attendees.push({ name });
                yield event.save();
                res.status(200).json({
                    message: 'Usuario agregado a la lista de asistentes.',
                    attendees: event.attendees,
                });
            }
            catch (err) {
                console.error('Error al agregar asistente:', err);
                res.status(500).json({ message: 'Error del servidor.' });
            }
        });
    }
    // Eliminar un evento por ID
    static deleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Validar el ID
                if (!mongoose_1.Types.ObjectId.isValid(id)) {
                    res.status(400).json({ message: 'ID de evento no válido.' });
                    return;
                }
                const eventoEliminado = yield eventModel_1.Event.findByIdAndDelete(id);
                if (!eventoEliminado) {
                    res.status(404).json({ message: 'Evento no encontrado.' });
                    return;
                }
                res.status(200).json({ message: 'Evento eliminado con éxito.' });
            }
            catch (err) {
                console.error('Error al eliminar el evento:', err);
                res.status(500).json({ message: 'Error al eliminar el evento.' });
            }
        });
    }
}
exports.EventController = EventController;
