import React from "react";
import { useFetchEvents } from "../hooks/UseFetchEvents"; // Asegúrate de usar la ruta correcta
import EventCard from "../components/EventCard"; // Asegúrate de usar la ruta correcta

const EventsList: React.FC = () => {
  const { events, loading, error } = useFetchEvents();

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Eventos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mx-auto max-w-screen-xl">
        {events?.slice(0, 3).map((event) => (
          <EventCard
            key={event._id}
            image={event.imageURL || "https://via.placeholder.com/300"} // Fallback si no hay imagen
            title={event.title}
            description={event.description}
            link={`/events/${event._id}`} // Ruta personalizada para cada evento
          />
        ))}
      </div>
      {/* Contenedor para centrar el botón */}
      <div className="flex justify-center mt-8">
        <a href="/events">
        <button
          className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ver más eventos
        </button></a>
      </div>
    </div>
  );
};

export default EventsList;
