"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = require("mongoose");
// Define el esquema de Mongoose
const eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    attendees: [
        {
            name: { type: String, required: true }
        }
    ],
    category: { type: String, required: true },
    imageURL: { type: String, required: true }
}, {
    timestamps: true
});
// Crea y exporta el modelo
exports.Event = (0, mongoose_1.model)('Event', eventSchema);
