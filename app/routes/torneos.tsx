import React from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { GET_TOURNAMENTS, GET_UPCOMING_TOURNAMENTS } from '../lib/graphql/queries';

interface Tournament {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  date: string;
  endDate?: string;
  registrationDeadline?: string;
  registrationLink?: string;
  disciplines: string[];
  ageCategories: string[];
  status: string;
  imageUrl?: string;
  organizer?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
  };
}

const formatDate = (dateString: string) => {
  return new Date(Number(dateString)).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getStatusBadge = (status: string) => {
  const badges: { [key: string]: string } = {
    'próximo': 'bg-teal-100 text-teal-800',
    'en_curso': 'bg-blue-100 text-blue-800',
    'finalizado': 'bg-gray-100 text-gray-800',
    'cancelado': 'bg-red-100 text-red-800',
  };
  
  const labels: { [key: string]: string } = {
    'próximo': 'Próximo',
    'en_curso': 'En Curso',
    'finalizado': 'Finalizado',
    'cancelado': 'Cancelado',
  };
  
  return {
    class: badges[status] || badges['próximo'],
    label: labels[status] || status
  };
};

const Torneos: React.FC = () => {
  const { loading: loadingUpcoming, data: upcomingData } = useQuery(GET_UPCOMING_TOURNAMENTS);
  const { loading: loadingAll, error, data: allData } = useQuery(GET_TOURNAMENTS, {
    variables: { 
      limit: 20,
      offset: 0
    }
  });

  const loading = loadingUpcoming || loadingAll;

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-linear-to-r from-teal-50 to-cyan-50 border-teal-100">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-800">Torneos y Competencias</CardTitle>
            <CardDescription className="text-teal-600">
              Cargando información de torneos...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card className="bg-linear-to-r from-red-50 to-orange-50 border-red-100">
          <CardHeader>
            <CardTitle className="text-2xl text-red-800">Error</CardTitle>
            <CardDescription className="text-red-600">
              No se pudieron cargar los torneos.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const upcomingTournaments: Tournament[] = upcomingData?.upcomingTournaments || [];
  const allTournaments: Tournament[] = allData?.tournaments || [];

  console.log(upcomingTournaments)
  return (
    <div className="space-y-6">
      {/* Tarjeta de introducción */}
      <Card className="bg-linear-to-r from-teal-50 to-cyan-50 border-teal-100">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-800">Torneos y Competencias</CardTitle>
          <CardDescription className="text-teal-600">
            Descubre y participa en los eventos organizados por nuestra institución
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Mantente al tanto de las actividades deportivas que se realizarán en las próximas semanas.
            Inscríbete en los eventos de tu interés para participar.
          </p>
        </CardContent>
      </Card>

      {/* Torneos Próximos Destacados */}
      {upcomingTournaments.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-300 mb-4">Próximos Eventos</h2>
          <div className="space-y-6">
            {upcomingTournaments.map((tournament) => {
              const statusBadge = getStatusBadge(tournament.status);
              const isRegistrationOpen = tournament.registrationDeadline && 
                new Date(Number(tournament.registrationDeadline)) > new Date();

              return (
                <Card key={tournament.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-800">{tournament.name}</CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          {formatDate(tournament.date)}
                          {tournament.endDate && ` - ${formatDate(tournament.endDate)}`}
                        </CardDescription>
                      </div>
                      <div className="mt-2 md:mt-0 flex gap-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusBadge.class}`}>
                          {statusBadge.label}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                          {tournament.category}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{tournament.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">📍 Ubicación:</p>
                        <p className="text-sm text-gray-600">{tournament.location}</p>
                      </div>
                      
                      {tournament.organizer && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700">🏛️ Organiza:</p>
                          <p className="text-sm text-gray-600">{tournament.organizer}</p>
                        </div>
                      )}
                      
                      {tournament.disciplines.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700">🏃 Disciplinas:</p>
                          <p className="text-sm text-gray-600">{tournament.disciplines.join(', ')}</p>
                        </div>
                      )}
                      
                      {tournament.ageCategories.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700">👥 Categorías:</p>
                          <p className="text-sm text-gray-600">{tournament.ageCategories.join(', ')}</p>
                        </div>
                      )}
                    </div>

                    {tournament.registrationDeadline && (
                      <div className={`p-3 rounded-lg mb-4 ${isRegistrationOpen ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <p className={`text-sm font-semibold ${isRegistrationOpen ? 'text-green-800' : 'text-gray-600'}`}>
                          {isRegistrationOpen ? '✅ Inscripciones Abiertas' : '⏰ Inscripciones Cerradas'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Fecha límite: {formatDate(tournament.registrationDeadline)}
                        </p>
                      </div>
                    )}

                    {tournament.contactInfo && (tournament.contactInfo.email || tournament.contactInfo.phone) && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-1">📞 Contacto:</p>
                        {tournament.contactInfo.email && (
                          <p className="text-sm text-gray-600">{tournament.contactInfo.email}</p>
                        )}
                        {tournament.contactInfo.phone && (
                          <p className="text-sm text-gray-600">{tournament.contactInfo.phone}</p>
                        )}
                      </div>
                    )}

                    <div className="flex justify-end gap-3">
                      {/* Link de inscripción del torneo (si existe) */}
                      {tournament.registrationLink && isRegistrationOpen && (
                        <a 
                          href={tournament.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center"
                        >
                          Inscribirse
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      )}
                      
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Todos los Torneos */}
      <Card>
        <CardHeader>
          <CardTitle>Todos los Torneos</CardTitle>
          <CardDescription>
            Lista completa de eventos organizados por la institución
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ubicación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allTournaments.map(tournament => {
                  const statusBadge = getStatusBadge(tournament.status);
                  const isRegistrationOpen = tournament.registrationDeadline && 
                    new Date(tournament.registrationDeadline) > new Date() &&
                    tournament.status === 'próximo';
                  
                  return (
                    <tr key={tournament.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{tournament.name}</div>
                        <div className="text-sm text-gray-500">{tournament.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(tournament.date)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{tournament.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusBadge.class}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {tournament.status === 'próximo' ? (
                          <div className="flex flex-col gap-2">
                            <a 
                              href="https://docs.google.com/forms/d/e/1FAIpQLSdW01ZBxClp3uJt6eiPS_EwCsHHt6Rw6mzzJsKOgqRak6XeKw/viewform?usp=sharing&ouid=111714396674666937246"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900 font-semibold"
                            >
                              Inscribirse
                            </a>
                            {tournament.registrationLink && isRegistrationOpen && (
                              <a 
                                href={tournament.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-600 hover:text-teal-900 text-xs"
                              >
                                Más info
                              </a>
                            )}
                          </div>
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