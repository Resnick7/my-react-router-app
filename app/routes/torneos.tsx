import React from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

// Datos de ejemplo de eventos
const eventsData = [
  {
    id: 1,
    title: "Conferencia sobre Inteligencia Artificial",
    date: "2023-08-15",
    time: "10:00 - 12:00",
    location: "Auditorio Principal",
    description: "Conferencia a cargo del Dr. Alan Turing sobre los avances en inteligencia artificial y su impacto en la sociedad.",
    formUrl: "https://forms.gle/ejemplo1"
  },
  // ... resto de los datos
];

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Función para determinar si un evento es próximo (dentro de los próximos 30 días)
const isUpcoming = (dateString: string) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 30;
};

// Loader para cargar los datos de eventos
export async function loader() {
  // Aquí iría la lógica para cargar datos desde una API
  return { eventsData };
}

// Action para manejar las acciones del componente
export async function action({ request }: { request: Request }) {
  // Aquí iría la lógica para manejar las acciones
  return {};
}

const Torneos: React.FC = () => {
  // const { eventsData } = useLoaderData() as { eventsData: typeof eventsData };
  const fetcher = useFetcher();
  
  // Filtrar solo los eventos próximos
  const upcomingEvents = eventsData.filter(event => isUpcoming(event.date));

  return (
    <div className="space-y-6">
      {/* Tarjeta de introducción */}
      <Card className="bg-linear-to-r from-teal-50 to-cyan-50 border-teal-100">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-800">Próximos Eventos</CardTitle>
          <CardDescription className="text-teal-600">
            Descubre y participa en los eventos organizados por nuestra institución
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Mantente al tanto de las actividades deportivas que se realizarán en las próximas semanas.
            Inscribete en los eventos de tu interés para participar.
          </p>
        </CardContent>
      </Card>

      {/* Lista de eventos */}
      <div className="space-y-6">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => (
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-800">{event.title}</CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      {formatDate(event.date)} • {event.time}
                    </CardDescription>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                      {event.location}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex justify-end">
                  <fetcher.Form method="post">
                    <input type="hidden" name="intent" value="register" />
                    <input type="hidden" name="eventId" value={event.id} />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center"
                    >
                      Inscribirse
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </fetcher.Form>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">No hay eventos próximos en este momento.</p>
              <p className="text-gray-500 text-sm mt-2">Vuelve a consultar más tarde para nuevas actividades.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Eventos pasados o futuros (no próximos) */}
      <Card>
        <CardHeader>
          <CardTitle>Todos los Eventos</CardTitle>
          <CardDescription>
            Lista completa de eventos organizados por la institución
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hora
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ubicación
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {eventsData.map(event => {
                  const eventDate = new Date(event.date);
                  const today = new Date();
                  const diffTime = eventDate.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  
                  let status = '';
                  let statusColor = '';
                  
                  if (diffDays < 0) {
                    status = 'Finalizado';
                    statusColor = 'bg-gray-100 text-gray-800';
                  } else if (diffDays <= 30) {
                    status = 'Próximo';
                    statusColor = 'bg-teal-100 text-teal-800';
                  } else {
                    status = 'Futuro';
                    statusColor = 'bg-blue-100 text-blue-800';
                  }
                  
                  return (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(event.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{event.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {diffDays >= 0 ? (
                          <fetcher.Form method="post">
                            <input type="hidden" name="intent" value="register" />
                            <input type="hidden" name="eventId" value={event.id} />
                            <button 
                              type="submit"
                              className="text-teal-600 hover:text-teal-900"
                            >
                              Inscribirse
                            </button>
                          </fetcher.Form>
                        ) : (
                          <span className="text-gray-400">No disponible</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Torneos;