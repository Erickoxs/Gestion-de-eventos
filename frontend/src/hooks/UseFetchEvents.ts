import { useState, useEffect } from 'react';
import api from '../utils/api'; // Importa el cliente HTTP configurado

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: { id: string; name: string }; // Array de organizadores con id y name
  attendees: { id: string; name: string }[]; // Array de asistentes con id y name
  category: string;
  imageURL: string;
}

export const useFetchEvents = () => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get('/api/events'); // Usa `api` para realizar la solicitud
        console.log(response.data)
        setEvents(response.data); // Almacena los datos obtenidos
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};
