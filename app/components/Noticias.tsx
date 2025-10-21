import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

// Datos de ejemplo de noticias
const newsData = [
  {
    id: 1,
    title: "Inauguración del nuevo laboratorio de investigación",
    summary: "La institución ha inaugurado un moderno laboratorio equipado con la última tecnología para fomentar la investigación científica.",
    date: "15 de julio de 2023",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Institucional"
  },
  {
    id: 2,
    title: "Conferencia internacional sobre educación del siglo XXI",
    summary: "Del 20 al 22 de agosto se realizará una conferencia con expertos de todo el mundo para discutir el futuro de la educación.",
    date: "10 de julio de 2023",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Eventos"
  },
  {
    id: 3,
    title: "Nuestros estudiantes ganan premio nacional de innovación",
    summary: "Un equipo de estudiantes de ingeniería ha sido galardonado con el primer premio en el concurso nacional de proyectos innovadores.",
    date: "5 de julio de 2023",
    imageUrl: "https://images.unsplash.com/photo-1523287562727-8d3c519c4b84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Logros"
  },
  {
    id: 4,
    title: "Nuevo programa de becas para estudiantes destacados",
    summary: "La institución ha lanzado un programa de becas completo que cubrirá el 100% de la matrícula para estudiantes con excelente rendimiento académico.",
    date: "1 de julio de 2023",
    imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Oportunidades"
  },
  {
    id: 5,
    title: "Colaboración internacional con universidades europeas",
    summary: "Se han firmado convenios con cinco universidades de Europa para facilitar el intercambio de estudiantes y profesores.",
    date: "28 de junio de 2023",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Internacional"
  },
  {
    id: 6,
    title: "Taller de preparación para el mundo laboral",
    summary: "El departamento de orientación profesional organizará talleres gratuitos para preparar a los estudiantes para su inserción en el mercado laboral.",
    date: "25 de junio de 2023",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Servicios"
  }
];

const Noticia: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Tarjeta de introducción */}
      <Card className="bg-linear-to-r from-amber-50 to-orange-50 border-amber-100">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-800">Noticias Institucionales</CardTitle>
          <CardDescription className="text-amber-600">
            Mantente informado sobre las últimas novedades y eventos de nuestra comunidad educativa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Descubre las noticias más relevantes sobre nuestra institución, eventos académicos, logros de estudiantes y profesores, y oportunidades de desarrollo.
          </p>
        </CardContent>
      </Card>

      {/* Filtros de categorías */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar por categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(newsData.map(item => item.category))).map(category => (
              <button 
                key={category}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de noticias */}
      <div className="space-y-6">
        {newsData.map(news => (
          <Card key={news.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img 
                  src={news.imageUrl} 
                  alt={news.title} 
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {news.category}
                  </span>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.summary}</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                  Leer más
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-2">
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Anterior
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">2</button>
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">3</button>
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Noticia;