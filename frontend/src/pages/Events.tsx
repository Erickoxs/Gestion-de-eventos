import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api"; // Configura tu cliente de API correctamente

const EventSection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError("ID del evento no proporcionado.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/api/events/${id}`);
        console.log("Evento obtenido:", response.data);
        setEvent(response.data);
      } catch (err) {
        console.error("Error al obtener el evento:", err);
        setError("No se pudo cargar el evento.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleAttendEvent = async () => {
    const username = localStorage.getItem("userName");
  
    if (!username) {
      alert("Primero debes iniciar sesión.");
      return;
    }
  
    try {
      // Crear el cuerpo en formato JSON
      const requestBody = {
        name: username,
      };
  
      // Realizar la petición POST
      await api.post(`/api/events/attendees/${id}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      alert("¡Te has registrado para asistir al evento!");
  
      // Actualizar el número de asistentes localmente
      setEvent((prevEvent: any) => ({
        ...prevEvent,
        attendees: [...prevEvent.attendees, { name: username }],
      }));
    } catch (err) {
      console.error("Error al registrarse en el evento:", err);
      alert("Ocurrió un error al intentar registrarte en el evento.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return null;

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Imagen */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full dark:hidden"
              src={event.imageURL || "https://via.placeholder.com/300"}
              alt={event.name || "Evento en modo claro"}
            />
            <img
              className="w-full hidden dark:block"
              src={event.imageURL || "https://via.placeholder.com/300"}
              alt={event.name || "Evento en modo oscuro"}
            />
          </div>

          {/* Información del evento */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {event.name}
            </h1>
            <p className="mt-4 text-gray-700 dark:text-gray-400">
              <strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()} {" "}
              {new Date(event.date).toLocaleTimeString()}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-400">
              <strong>Ubicación:</strong> {event.location}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-400">
              <strong>Organizador:</strong> {event.organizer.name}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-400">
              <strong>Número de asistentes:</strong> {event.attendees.length}
            </p>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              {/* Botón "Agregar a favoritos" */}
              <a
                href="#"
                title="Agregar a favoritos"
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Agregar a favoritos
              </a>

              {/* Botón "Compartir evento" */}
              <a
                href="#"
                title="Compartir evento"
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0-4 4m4-4H7m6-4v16"
                  />
                </svg>
                Compartir evento
              </a>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            {/* Descripción del evento */}
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {event.description}
            </p>

            <button
              className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
              onClick={handleAttendEvent}
            >
              Asistir al evento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
