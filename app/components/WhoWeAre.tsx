import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Profesor from '~/components/Profesor';

// Datos de ejemplo de profesores
const teachersData = [
  {
    id: 1,
    name: 'Dr. Juan Pérez',
    specialty: 'Matemáticas',
    description: 'Profesor con más de 10 años de experiencia en álgebra y cálculo. Especializado en matemáticas avanzadas y estadística aplicada.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 2,
    name: 'Dra. Ana Gómez',
    specialty: 'Física',
    description: 'Experta en mecánica cuántica y termodinámica. Investigadora reconocida internacionalmente con publicaciones en revistas científicas de prestigio.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 3,
    name: 'Dr. Carlos López',
    specialty: 'Química',
    description: 'Especialista en química orgánica y materiales. Director del laboratorio de investigación química de la universidad.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 4,
    name: 'Dra. María Rodríguez',
    specialty: 'Biología',
    description: 'Investigadora en genética y biotecnología. Profesora con experiencia en proyectos de investigación sobre biodiversidad y conservación.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 5,
    name: 'Dr. Roberto Sánchez',
    specialty: 'Historia',
    description: 'Especialista en historia contemporánea y movimientos sociales. Autor de varios libros sobre historia latinoamericana.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 6,
    name: 'Dra. Laura Martínez',
    specialty: 'Literatura',
    description: 'Experta en literatura latinoamericana y teoría literaria. Coordinadora del programa de escritura creativa de la universidad.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  }
];

const WhoWeAre: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Tarjeta de bienvenida */}
      <Card className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Panel de Control</CardTitle>
          <CardDescription className="text-blue-600">
            Bienvenido al sistema de gestión académica. Aquí encontrarás información relevante sobre profesores y actividades.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Explora las diferentes secciones para gestionar profesores, configurar parámetros del sistema y ver tu perfil personal.
          </p>
        </CardContent>
      </Card>

      {/* Sección de profesores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Profesores Destacados</CardTitle>
          <CardDescription>
            Conoce a nuestro equipo docente y sus áreas de especialización
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teachersData.map(teacher => (
              <Profesor key={teacher.id} teacher={teacher} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Ver todos los profesores
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-green-50 border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-800">Profesores Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">24</p>
            <p className="text-green-700">De un total de 30</p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 border-amber-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-800">Cursos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">18</p>
            <p className="text-amber-700">En este semestre</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-purple-800">Estudiantes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">342</p>
            <p className="text-purple-700">Inscritos este año</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhoWeAre;