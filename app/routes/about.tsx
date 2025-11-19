import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Profesor from '~/components/Profesor';
import { useQuery } from '@apollo/client/react';
import { GET_TEACHERS } from '../lib/graphql/queries';

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  bio?: string;
  photoUrl?: string;
  specialties: string[];
  experience?: number;
  isActive: boolean;
}

const WhoWeAre: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TEACHERS, {
    variables: { isActive: true }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800">Nuestro Equipo</CardTitle>
            <CardDescription className="text-blue-600">
              Cargando información de profesores...
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
              No se pudo cargar la información de los profesores.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const teachersData: Teacher[] = data?.teachers || [];

  return (
    <div className="space-y-6">
      {/* Tarjeta de bienvenida */}
      <Card className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-800">Círculo de Atletas Veteranos de Mendoza</CardTitle>
          <CardDescription className="text-blue-600">
            Conoce a nuestro equipo de profesionales dedicados al atletismo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            En CAVEM contamos con profesores altamente capacitados y con amplia experiencia en diversas 
            disciplinas del atletismo. Nuestro objetivo es acompañarte en tu desarrollo deportivo, 
            sin importar tu edad o nivel de experiencia.
          </p>
        </CardContent>
      </Card>

      {/* Sección de profesores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Nuestros Profesores</CardTitle>
          <CardDescription>
            Conoce a nuestro equipo docente y sus áreas de especialización
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teachersData.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No hay profesores disponibles en este momento.
              </p>
            ) : (
              teachersData.map(teacher => (
                <Profesor 
                  key={teacher.id} 
                  teacher={{
                    id: parseInt(teacher.id),
                    name: teacher.fullName,
                    specialty: teacher.specialties.join(', '),
                    description: teacher.bio || `Profesor con ${teacher.experience || 0} años de experiencia`,
                    imageUrl: teacher.photoUrl
                  }} 
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhoWeAre;