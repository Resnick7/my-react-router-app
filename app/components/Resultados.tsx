import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

// Datos de ejemplo de resultados de eventos
const resultsData = [
  {
    id: 1,
    eventTitle: "Conferencia sobre Inteligencia Artificial",
    eventDate: "2023-08-15",
    pdfTitle: "Acta de la Conferencia de IA",
    pdfUrl: "/pdfs/conferencia-ia-2023.pdf", // Ruta local o URL externa
    fileSize: "2.4 MB",
    uploadDate: "2023-08-20"
  },
  {
    id: 2,
    eventTitle: "Taller de Programación Web",
    eventDate: "2023-08-20",
    pdfTitle: "Material del Taller de Programación Web",
    pdfUrl: "/pdfs/taller-web-2023.pdf",
    fileSize: "5.1 MB",
    uploadDate: "2023-08-25"
  },
  {
    id: 3,
    eventTitle: "Seminario de Sostenibilidad Ambiental",
    eventDate: "2023-08-25",
    pdfTitle: "Conclusiones del Seminario de Sostenibilidad",
    pdfUrl: "/pdfs/seminario-sostenibilidad-2023.pdf",
    fileSize: "1.8 MB",
    uploadDate: "2023-08-30"
  },
  {
    id: 4,
    eventTitle: "Exposición de Arte Estudiantil",
    eventDate: "2023-09-05",
    pdfTitle: "Catálogo de la Exposición de Arte",
    pdfUrl: "/pdfs/exposicion-arte-2023.pdf",
    fileSize: "12.3 MB",
    uploadDate: "2023-09-10"
  },
  {
    id: 5,
    eventTitle: "Foro de Emprendimiento",
    eventDate: "2023-09-10",
    pdfTitle: "Resumen del Foro de Emprendimiento",
    pdfUrl: "/pdfs/foro-emprendimiento-2023.pdf",
    fileSize: "3.7 MB",
    uploadDate: "2023-09-15"
  },
  {
    id: 6,
    eventTitle: "Torneo Deportivo Interuniversitario",
    eventDate: "2023-09-15",
    pdfTitle: "Resultados del Torneo Deportivo",
    pdfUrl: "/pdfs/torneo-deportivo-2023.pdf",
    fileSize: "4.2 MB",
    uploadDate: "2023-09-20"
  }
];

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Componente para la tarjeta de resultado
const ResultCard: React.FC<{ result: typeof resultsData[0] }> = ({ result }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">{result.eventTitle}</CardTitle>
        <CardDescription className="text-gray-600">
          Evento realizado el {formatDate(result.eventDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-gray-900">{result.pdfTitle}</h4>
            <p className="text-sm text-gray-500">{result.fileSize} • Subido el {formatDate(result.uploadDate)}</p>
          </div>
          <div className="flex space-x-2">
            <a 
              href={result.pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors flex items-center text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ver
            </a>
            <a 
              href={result.pdfUrl} 
              download
              className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors flex items-center text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descargar
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Resultados: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Tarjeta de introducción */}
      <Card className="bg-linear-to-r from-purple-50 to-indigo-50 border-purple-100">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-800">Resultados de Eventos</CardTitle>
          <CardDescription className="text-purple-600">
            Accede a los documentos y resultados de los eventos realizados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            En esta sección encontrarás los documentos PDF con los resultados, actas, conclusiones y materiales de los eventos organizados por nuestra institución.
            Puedes verlos en línea o descargarlos para su consulta posterior.
          </p>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtrar resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
              Todos
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Conferencias
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Talleres
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Seminarios
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Eventos Culturales
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Eventos Deportivos
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de resultados */}
      <div className="space-y-4">
        {resultsData.map(result => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-2">
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Anterior
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">1</button>
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">2</button>
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">3</button>
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Resultados