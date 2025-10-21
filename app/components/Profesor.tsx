import React from 'react';
import { Card } from './ui/card';

interface Teacher {
  id: number;
  name: string;
  specialty: string;
  description: string;
  imageUrl: string;
}

interface TeacherCardProps {
  teacher: Teacher;
}

const Profesor: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <Card className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 p-4 hover:shadow-md transition-shadow">
      <div className="shrink-0">
        <img 
          src={teacher.imageUrl} 
          alt={teacher.name} 
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
        />
      </div>
      <div className="grow text-center md:text-left">
        <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
        <p className="text-blue-600 font-medium">{teacher.specialty}</p>
        <p className="text-gray-600 mt-2">{teacher.description}</p>
      </div>
    </Card>
  );
};

export default Profesor;