import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import TablaHorarios from './TablaHorarios';

// Datos de ejemplo del horario
const scheduleData = [
  {
    id: 1,
    subject: "Matemáticas Avanzadas",
    teacher: "Dr. Juan Pérez",
    day: "Lunes",
    startTime: "08:00",
    endTime: "09:30",
    classroom: "A-101",
    color: "bg-blue-500"
  },
  {
    id: 2,
    subject: "Física Cuántica",
    teacher: "Dra. Ana Gómez",
    day: "Lunes",
    startTime: "09:45",
    endTime: "11:15",
    classroom: "B-205",
    color: "bg-green-500"
  },
  {
    id: 3,
    subject: "Química Orgánica",
    teacher: "Dr. Carlos López",
    day: "Lunes",
    startTime: "14:30",
    endTime: "16:00",
    classroom: "C-302",
    color: "bg-purple-500"
  },
  {
    id: 4,
    subject: "Literatura Latinoamericana",
    teacher: "Dra. Laura Martínez",
    day: "Martes",
    startTime: "08:00",
    endTime: "09:30",
    classroom: "D-105",
    color: "bg-yellow-500"
  },
  {
    id: 5,
    subject: "Historia Contemporánea",
    teacher: "Dr. Roberto Sánchez",
    day: "Martes",
    startTime: "09:45",
    endTime: "11:15",
    classroom: "E-201",
    color: "bg-red-500"
  },
  {
    id: 6,
    subject: "Biología Molecular",
    teacher: "Dra. María Rodríguez",
    day: "Martes",
    startTime: "11:30",
    endTime: "13:00",
    classroom: "F-301",
    color: "bg-teal-500"
  },
  {
    id: 7,
    subject: "Matemáticas Avanzadas",
    teacher: "Dr. Juan Pérez",
    day: "Miércoles",
    startTime: "08:00",
    endTime: "09:30",
    classroom: "A-101",
    color: "bg-blue-500"
  },
  {
    id: 8,
    subject: "Física Cuántica",
    teacher: "Dra. Ana Gómez",
    day: "Miércoles",
    startTime: "09:45",
    endTime: "11:15",
    classroom: "B-205",
    color: "bg-green-500"
  },
  {
    id: 9,
    subject: "Programación Web",
    teacher: "Dr. Miguel Ángel",
    day: "Miércoles",
    startTime: "14:30",
    endTime: "16:00",
    classroom: "G-401",
    color: "bg-indigo-500"
  },
  {
    id: 10,
    subject: "Literatura Latinoamericana",
    teacher: "Dra. Laura Martínez",
    day: "Jueves",
    startTime: "08:00",
    endTime: "09:30",
    classroom: "D-105",
    color: "bg-yellow-500"
  },
  {
    id: 11,
    subject: "Historia Contemporánea",
    teacher: "Dr. Roberto Sánchez",
    day: "Jueves",
    startTime: "09:45",
    endTime: "11:15",
    classroom: "E-201",
    color: "bg-red-500"
  },
  {
    id: 12,
    subject: "Biología Molecular",
    teacher: "Dra. María Rodríguez",
    day: "Jueves",
    startTime: "11:30",
    endTime: "13:00",
    classroom: "F-301",
    color: "bg-teal-500"
  },
  {
    id: 13,
    subject: "Química Orgánica",
    teacher: "Dr. Carlos López",
    day: "Viernes",
    startTime: "08:00",
    endTime: "09:30",
    classroom: "C-302",
    color: "bg-purple-500"
  },
  {
    id: 14,
    subject: "Programación Web",
    teacher: "Dr. Miguel Ángel",
    day: "Viernes",
    startTime: "09:45",
    endTime: "11:15",
    classroom: "G-401",
    color: "bg-indigo-500"
  },
  {
    id: 15,
    subject: "Estadística Aplicada",
    teacher: "Dra. Carmen Torres",
    day: "Viernes",
    startTime: "14:30",
    endTime: "16:00",
    classroom: "H-102",
    color: "bg-pink-500"
  }
];

const Horarios: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Tarjeta de introducción */}
      <Card className="bg-linear-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-800">Configuración de Horarios</CardTitle>
          <CardDescription className="text-indigo-600">
            Gestiona y visualiza los horarios de clases a lo largo de la semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            En esta sección puedes consultar el horario semanal de clases. Cada bloque muestra la asignatura, profesor y aula correspondiente.
          </p>
        </CardContent>
      </Card>

      {/* Tabla de horarios */}
      <TablaHorarios schedule={scheduleData} />

      {/* Leyenda de colores */}
      <Card>
        <CardHeader>
          <CardTitle>Leyenda de Asignaturas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from(new Set(scheduleData.map(item => item.subject))).map(subject => {
              const item = scheduleData.find(i => i.subject === subject);
              return (
                <div key={subject} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${item?.color}`}></div>
                  <span className="text-sm">{subject}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Opciones de configuración */}
      <Card>
        <CardHeader>
          <CardTitle>Opciones de Configuración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="font-medium">Vista actual</h3>
              <p className="text-sm text-gray-500">Semana actual (15-21 de julio)</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                Semana anterior
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Semana siguiente
              </button>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-medium mb-2">Acciones rápidas</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Exportar horario
              </button>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Imprimir horario
              </button>
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors">
                Agregar clase
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Horarios