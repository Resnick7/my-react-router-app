import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_NEWS, INCREMENT_NEWS_VIEWS } from '../lib/graphql/queries';
import { Link } from 'react-router';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  category: string;
  publishedAt: string;
  author: {
    username: string;
  };
}

const Noticia: React.FC = () => {
  const { loading, error, data } = useQuery(GET_NEWS, {
    variables: { 
      limit: 10, 
      offset: 0,
      isPublished: true 
    }
  });

  const [incrementViews] = useMutation(INCREMENT_NEWS_VIEWS);

  const handleReadMore = (newsId: string) => {
    incrementViews({ 
      variables: { id: newsId },
      refetchQueries: [{ query: GET_NEWS, variables: { isPublished: true } }]
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-linear-to-r from-amber-50 to-orange-50 border-amber-100">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-800">Noticias Institucionales</CardTitle>
            <CardDescription className="text-amber-600">
              Cargando noticias...
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
              No se pudieron cargar las noticias. Por favor, intenta más tarde.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const newsData: NewsItem[] = data?.news || [];

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
        {newsData.length === 0 ? (
          <Card>
            <CardHeader>
              <CardDescription>No hay noticias disponibles en este momento.</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          newsData.map((news) => (
            <Card key={news.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {news.imageUrl && (
                  <div className="md:w-1/3">
                    <img 
                      src={news.imageUrl} 
                      alt={news.title} 
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                )}
                <div className={`${news.imageUrl ? 'md:w-2/3' : 'w-full'} p-6`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {news.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(Number(news.publishedAt)).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{news.title}</h3>
                  <p className="text-gray-600 mb-4">{news.excerpt || news.content.substring(0, 150) + '...'}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Por {news.author.username}</span>
                    <Link 
                      to={`/noticias/${news.id}`}
                      onClick={() => handleReadMore(news.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      Leer más
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Noticia;