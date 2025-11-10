import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Profesor from '~/components/Profesor';
import { useFetcher } from 'react-router';

// Datos de ejemplo de profesores
const teachersData = [
  {
    id: 1,
    name: 'Dr. Juan Pérez',
    specialty: 'Matemáticas',
    description: 'Profesor con más de 10 años de experiencia en álgebra y cálculo. Especializado en matemáticas avanzadas y estadística aplicada.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  // ... resto de los datos
];

// Datos de ejemplo de estadísticas
const statsData = {
  activeTeachers: 24,
  totalTeachers: 30,
  activeCourses: 18,
  students: 342
};

// Loader para cargar los datos de profesores y estadísticas
export async function loader() {
  // Aquí iría la lógica para cargar datos desde una API
  return { 
    teachersData,
    statsData
  };
}

// Action para manejar las acciones del componente
export async function action({ request }: { request: Request }) {
  // Aquí iría la lógica para manejar las acciones
  return {};
}

const WhoWeAre: React.FC = () => {
  // const { teachersData, statsData } = useLoaderData() as { 
  //   teachersData: typeof teachersData, 
  //   statsData: typeof statsData 
  // };
  const fetcher = useFetcher();

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
        </CardContent>
      </Card>
    </div>
  );
};

export default WhoWeAre;