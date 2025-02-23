import React, { useEffect } from "react";
import { useFetchEvents } from "../hooks/UseFetchEvents";
import EventCard from "../components/EventCard";




const FullEventList: React.FC = () => {



    const {events, loading, error} =  useFetchEvents()

    if(loading)return(<p>Cargando eventos...</p>)
    if(error)return(<p>Error al cargar los eventos</p>)


        return (
            <div>
              <h1 className="text-3xl font-bold text-center mb-8">Lista de Eventos</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center mx-auto max-w-screen-xl">
                {events?.map((event) => (
                  <EventCard
                    key={event._id}
                    image={event.imageURL || "https://via.placeholder.com/300"} // Fallback si no hay imagen
                    title={event.title}
                    description={event.description}
                    link={`/events/${event._id}`} // Ruta personalizada para cada evento
                  />
                ))}
              </div>
            </div>
          );

}

export default FullEventList;