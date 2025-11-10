import React from 'react';
import { useFetcher, useLoaderData } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

// Datos de ejemplo de resultados de eventos
const resultsData = [
  {
    id: 1,
    eventTitle: "Conferencia sobre Inteligencia Artificial",
    eventDate: "2023-08-15",
    pdfTitle: "Acta de la Conferencia de IA",
    pdfUrl: "/pdfs/conferencia-ia-2023.pdf",
    fileSize: "2.4 MB",
    uploadDate: "2023-08-20"
  },
  // ... resto de los datos
];

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Componente para la tarjeta de resultado
const ResultCard: React.FC<{ result: typeof resultsData[0] }> = ({ result }) => {
  const fetcher = useFetcher();
  
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
            <fetcher.Form method="post">
              <input type="hidden" name="intent" value="view" />
              <input type="hidden" name="pdfUrl" value={result.pdfUrl} />
              <button 
                type="submit"
                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors flex items-center text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Ver
              </button>
            </fetcher.Form>
            
            <fetcher.Form method="post">
              <input type="hidden" name="intent" value="download" />
              <input type="hidden" name="pdfUrl" value={result.pdfUrl} />
              <input type="hidden" name="pdfTitle" value={result.pdfTitle} />
              <button 
                type="submit"
                className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors flex items-center text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar
              </button>
            </fetcher.Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Loader para cargar los datos de resultados
export async function loader() {
  // Aquí iría la lógica para cargar datos desde una API
  return { resultsData };
}

// Action para manejar las acciones del componente
export async function action({ request }: { request: Request }) {
  // Aquí iría la lógica para manejar las acciones
  return {};
}

const Resultados: React.FC = () => {
  // const { resultsData } = useLoaderData() as { resultsData: typeof resultsData };
  const fetcher = useFetcher();

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
      </Card>

      {/* Lista de resultados */}
      <div className="space-y-4">
        {resultsData.map(result => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

export default Resultados;