import { Schema, model, Document } from 'mongoose';

// Define la interfaz para los asistentes
interface Attendee {
  name: string; // Nombre del usuario
}

// Define la interfaz para el documento del modelo
export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string; // Cambiado de string a objeto con coordenadas
  organizer: Schema.Types.ObjectId; // ID del organizador
  attendees: Attendee[]; // Array de asistentes con id y name
  category: string;
  imageURL?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Define el esquema de Mongoose
const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [
      {
        name: { type: String, required: true }
      }
    ],
    category: { type: String, required: true },
    imageURL: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

// Crea y exporta el modelo
export const Event = model<IEvent>('Event', eventSchema);
