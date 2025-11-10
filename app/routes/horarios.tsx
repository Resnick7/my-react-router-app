import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useLoaderData } from 'react-router';
import TablaHorarios from '~/components/TablaHorarios';

const scheduleData = [
  {
    id: 1,
    subject: "Entrenamiento de pista",
    teacher: "Norma Contrera",
    day: "Martes",
    startTime: "16:00",
    endTime: "18:00",
    classroom: "Pista provincial de atletismo",
    color: "bg-blue-500"
  },
  {
    id: 1,
    subject: "Entrenamiento de pista",
    teacher: "Monica Rojas",
    day: "Jueves",
    startTime: "16:00",
    endTime: "18:00",
    classroom: "Pista provincial de atletismo",
    color: "bg-blue-500"
  },
  {
    id: 1,
    subject: "Entrenamiento de pista",
    teacher: "Matías Pscitelli",
    day: "Sábado",
    startTime: "10:00",
    endTime: "12:00",
    classroom: "Pista provincial de atletismo",
    color: "bg-blue-500"
  },
];

const Horarios: React.FC = () => {

  return (
    <div className="space-y-6">
      {/* Tarjeta de introducción */}
      <Card className="bg-linear-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-800">Configuración de horarios</CardTitle>
          <CardDescription className="text-indigo-600">
            En esta sección puedes consultar el horario semanal de clases.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tabla de horarios */}
      <TablaHorarios schedule={scheduleData} />

    </div>
  );
};

export default Horarios;