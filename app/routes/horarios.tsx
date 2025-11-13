import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useQuery } from '@apollo/client/react';
import { GET_TEACHERS } from '../lib/graphql/queries';

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  ageGroup?: string;
  discipline?: string;
}

interface Teacher {
  id: string;
  fullName: string;
  schedule: Schedule[];
}

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const getColorForDiscipline = (discipline?: string): string => {
  const colors: { [key: string]: string } = {
    'Velocidad': 'bg-blue-500',
    'Saltos': 'bg-green-500',
    'Fondo': 'bg-purple-500',
    'Medio Fondo': 'bg-indigo-500',
    'Lanzamientos': 'bg-orange-500',
    'Vallas': 'bg-red-500',
  };
  
  if (!discipline) return 'bg-gray-500';
  
  for (const key in colors) {
    if (discipline.toLowerCase().includes(key.toLowerCase())) {
      return colors[key];
    }
  }
  
  return 'bg-gray-500';
};

const Horarios: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TEACHERS, {
    variables: { isActive: true }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-linear-to-r from-indigo-50 to-purple-50 border-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl text-indigo-800">Horarios de Entrenamiento</CardTitle>
            <CardDescription className="text-indigo-600">
              Cargando horarios...
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
              No se pudieron cargar los horarios.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const teachersData: Teacher[] = data?.teachers || [];
  
  // Agrupar todos los horarios por día y hora
  const allSchedules: { [key: string]: { teacher: string; schedule: Schedule }[] } = {};
  
  teachersData.forEach(teacher => {
    teacher.schedule.forEach(sched => {
      const key = `${sched.day}-${sched.startTime}`;
      if (!allSchedules[key]) {
        allSchedules[key] = [];
      }
      allSchedules[key].push({
        teacher: teacher.fullName,
        schedule: sched
      });
    });
  });

  // Obtener horarios únicos ordenados
  const uniqueTimes = [...new Set(
    teachersData.flatMap(t => t.schedule.map(s => s.startTime))
  )].sort();

  return (
    <div className="space-y-6">
      {/* Tarjeta de introducción */}
      <Card className="bg-linear-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-800">Horarios de Entrenamiento</CardTitle>
          <CardDescription className="text-indigo-600">
            Consulta los horarios semanales de clases y entrenamientos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Ofrecemos entrenamientos adaptados a todas las edades y niveles. 
            Encuentra el horario que mejor se ajuste a tu disponibilidad.
          </p>
        </CardContent>
      </Card>

            {/* Vista de tabla tradicional */}
      <Card>
        <CardHeader>
          <CardTitle>Tabla de Horarios Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 bg-gray-50 text-left">Hora</th>
                  {daysOfWeek.map(day => (
                    <th key={day} className="border border-gray-300 p-2 bg-gray-50 text-center">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uniqueTimes.map(time => (
                  <tr key={time}>
                    <td className="border border-gray-300 p-2 bg-gray-50 font-medium whitespace-nowrap">
                      {time}
                    </td>
                    {daysOfWeek.map(day => {
                      const key = `${day}-${time}`;
                      const schedules = allSchedules[key] || [];
                      
                      return (
                        <td key={`${day}-${time}`} className="border border-gray-300 p-2 align-top">
                          {schedules.length > 0 ? (
                            <div className="space-y-2">
                              {schedules.map((item, idx) => (
                                <div 
                                  key={idx}
                                  className={`p-2 rounded text-white text-xs ${getColorForDiscipline(item.schedule.discipline)}`}
                                >
                                  <div className="font-bold">{item.schedule.discipline}</div>
                                  <div>{item.teacher}</div>
                                  <div className="mt-1">{item.schedule.location}</div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="h-full min-h-[60px]"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de horarios por día */}
      {daysOfWeek.map(day => {
        const daySchedules = Object.entries(allSchedules)
          .filter(([key]) => key.startsWith(day))
          .map(([_, schedules]) => schedules)
          .flat();

        if (daySchedules.length === 0) return null;

        return (
          <Card key={day}>
            <CardHeader>
              <CardTitle className="text-xl">{day}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {daySchedules.map((item, idx) => (
                  <div 
                    key={`${day}-${idx}`}
                    className={`p-4 rounded-lg text-white ${getColorForDiscipline(item.schedule.discipline)}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-bold text-lg">
                          {item.schedule.discipline || 'Entrenamiento'}
                        </div>
                        <div className="text-sm opacity-90">
                          Profesor: {item.teacher}
                        </div>
                        {item.schedule.ageGroup && (
                          <div className="text-sm opacity-90">
                            {item.schedule.ageGroup}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <div className="font-semibold">
                          {item.schedule.startTime} - {item.schedule.endTime}
                        </div>
                        <div className="text-sm opacity-90">
                          {item.schedule.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Horarios;