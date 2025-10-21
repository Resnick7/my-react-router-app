import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ScheduleItem {
  id: number;
  subject: string;
  teacher: string;
  day: string;
  startTime: string;
  endTime: string;
  classroom: string;
  color: string;
}

interface ScheduleTableProps {
  schedule: ScheduleItem[];
}

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const timeSlots = [
  '08:00 - 09:30',
  '09:45 - 11:15',
  '11:30 - 13:00',
  '14:30 - 16:00',
  '16:15 - 17:45'
];

const TablaHorarios: React.FC<ScheduleTableProps> = ({ schedule }) => {
  // Función para obtener la clase en un día y hora específicos
  const getClassForSlot = (day: string, timeSlot: string) => {
    const [startTime] = timeSlot.split(' - ');
    return schedule.find(item => 
      item.day === day && item.startTime === startTime
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horario de Clases</CardTitle>
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
              {timeSlots.map(timeSlot => (
                <tr key={timeSlot}>
                  <td className="border border-gray-300 p-2 bg-gray-50 font-medium">
                    {timeSlot}
                  </td>
                  {daysOfWeek.map(day => {
                    const classItem = getClassForSlot(day, timeSlot);
                    return (
                      <td key={`${day}-${timeSlot}`} className="border border-gray-300 p-2 align-top">
                        {classItem ? (
                          <div 
                            className={`p-2 rounded text-white ${classItem.color}`}
                          >
                            <div className="font-bold">{classItem.subject}</div>
                            <div className="text-sm">{classItem.teacher}</div>
                            <div className="text-xs mt-1">{classItem.classroom}</div>
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
  );
};

export default TablaHorarios;