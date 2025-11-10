import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useFetcher } from 'react-router';

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
  // ... resto de los datos
];

// Loader para cargar los datos de noticias
export async function loader() {
  // Aquí iría la lógica para cargar datos desde una API
  return { newsData };
}

// Action para manejar las acciones del componente
export async function action({ request }: { request: Request }) {
  // Aquí iría la lógica para manejar las acciones
  return {};
}

const Noticia: React.FC = () => {
  // const { newsData } = useLoaderData() as { newsData: typeof newsData };
  const fetcher = useFetcher();

  return (
    <div className="space-y-6">
      {/* Tarjeta de introducción */}
      <Card className="bg-linear-to-r from-amber-50 to-orange-50 border-amber-100">
        <CardHeader>
          <CardTitle className="text-2xl text-amber-800">Noticias Institucionales</CardTitle>
          <CardDescription className="text-amber-600">
            Mantente informado sobre las últimas novedades y eventos de nuestra comunidad deportiva.
          </CardDescription>
        </CardHeader>
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
                <fetcher.Form method="post">
                  <input type="hidden" name="intent" value="readMore" />
                  <input type="hidden" name="newsId" value={news.id} />
                  <button 
                    type="submit"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    Leer más
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </fetcher.Form>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Noticia;