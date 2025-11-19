import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { GET_TOURNAMENT_RESULTS } from '../lib/graphql/queries';

interface TournamentResult {
  id: string;
  title: string;
  description?: string;
  pdfUrl: string;
  pdfFileName: string;
  fileSize?: number;
  resultType: string;
  discipline?: string;
  category?: string;
  isPublished: boolean;
  publishedAt: string;
  downloads: number;
  tournament: {
    id: string;
    name: string;
    date: string;
  };
  uploadedBy: {
    id: string;
    username: string;
  };
  createdAt: string;
}

const formatDate = (dateString: string) => {
  return new Date(Number(dateString)).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return 'N/A';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};

const ResultCard: React.FC<{ result: TournamentResult }> = ({ result }) => {

  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:4000/download-pdf/${result.pdfFileName}`);

      if (!response.ok) {
        console.error("Error al descargar archivo");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = result.pdfFileName;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error en la descarga:", err);
    }
  };

  const handleView = () => {
    window.open(result.pdfUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-gray-800">{result.title}</CardTitle>
            <CardDescription className="text-gray-600">
              {result.tournament.name} - {formatDate(result.tournament.date)}
            </CardDescription>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {result.resultType}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {result.description && (
          <p className="text-gray-600 mb-4">{result.description}</p>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {result.discipline && (
            <div>
              <p className="text-sm font-semibold text-gray-700">Disciplina:</p>
              <p className="text-sm text-gray-600">{result.discipline}</p>
            </div>
          )}
          
          {result.category && (
            <div>
              <p className="text-sm font-semibold text-gray-700">Categoría:</p>
              <p className="text-sm text-gray-600">{result.category}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">{result.pdfFileName}</h4>
            <p className="text-sm text-gray-500">
              {formatFileSize(result.fileSize)} • Subido el {formatDate(result.publishedAt)}
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={handleView}
            className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors flex items-center justify-center text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Ver
          </button>
          
          <button 
            onClick={handleDownload}
            className="flex-1 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors flex items-center justify-center text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const Resultados: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>();
  
  const { loading, error, data } = useQuery(GET_TOURNAMENT_RESULTS, {
    variables: { 
      limit: 20,
      offset: 0
    }
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-linear-to-r from-purple-50 to-indigo-50 border-purple-100">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-800">Resultados de Eventos</CardTitle>
            <CardDescription className="text-purple-600">
              Cargando resultados...
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
              No se pudieron cargar los resultados.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const results: TournamentResult[] = data?.tournamentResults || [];
  
  // Filtrar resultados por tipo si está seleccionado
  const filteredResults = selectedType 
    ? results.filter(r => r.resultType === selectedType)
    : results;

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
            Consulta los resultados oficiales de los torneos y competencias en las que hemos participado.
            Puedes ver y descargar los documentos en formato PDF.
          </p>
        </CardContent>
      </Card>

      {/* Lista de resultados */}
      <div className="space-y-4">
        {filteredResults.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">
                {selectedType 
                  ? `No hay resultados de tipo "${selectedType}" disponibles.`
                  : 'No hay resultados disponibles en este momento.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredResults.map(result => (
            <ResultCard key={result.id} result={result} />
          ))
        )}
      </div>
    </div>
  );
};

export default Resultados;