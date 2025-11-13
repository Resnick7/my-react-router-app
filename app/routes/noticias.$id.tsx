import React from 'react';
import { useParams, Link } from 'react-router';
import { useQuery, useMutation } from '@apollo/client/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { GET_NEWS_ITEM } from '../lib/graphql/queries';

interface NewsDetail {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  views: number;
  author: {
    id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

const NoticiaDetalle: React.FC = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_NEWS_ITEM, {
    variables: { id },
    skip: !id
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/noticias">
            <Button variant="outline" className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a Noticias
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Cargando noticia...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error || !data?.newsItem) {
    return (
      <div className="space-y-6">
        <Link to="/noticias">
          <Button variant="outline" className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a Noticias
          </Button>
        </Link>
        <Card className="bg-linear-to-r from-red-50 to-orange-50 border-red-100">
          <CardHeader>
            <CardTitle className="text-2xl text-red-800">Error</CardTitle>
            <CardDescription className="text-red-600">
              No se pudo cargar la noticia. Es posible que no exista o haya sido eliminada.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const news: NewsDetail = data.newsItem;

  const formatDate = (dateString: number) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Botón de volver */}
      <Link to="/noticias">
        <Button variant="outline" className='mb-6'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a Noticias
        </Button>
      </Link>

      {/* Contenido de la noticia */}
      <Card className="overflow-hidden">
        {/* Imagen destacada */}
        {news.imageUrl && (
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img 
              src={news.imageUrl} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <CardHeader className="space-y-4">
          {/* Categoría y fecha */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {news.category}
            </span>
            <span className="text-sm text-gray-500">
              📅 {formatDate(Number(news.publishedAt))}
            </span>
          </div>

          {/* Título */}
          <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">
            {news.title}
          </CardTitle>

          {/* Autor */}
          <div className="flex items-center space-x-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">Por {news.author.username}</span>
          </div>

          {/* Extracto */}
          {news.excerpt && (
            <CardDescription className="text-lg text-gray-600 italic border-l-4 border-amber-500 pl-4">
              {news.excerpt}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Contenido principal */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br/>') }}
            />
          </div>

          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Etiquetas:</h3>
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Información adicional */}
          <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <span className="font-semibold">Publicado:</span> {formatDate(Number(news.publishedAt))}
              </div>
              <div>
                <span className="font-semibold">Última actualización:</span> {formatDate(Number(news.updatedAt))}
              </div>
            </div>
          </div>

          {/* Compartir en redes sociales */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Compartir:</h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => {
                  const url = window.location.href;
                  const text = `${news.title} - CAVEM`;
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
                Twitter
              </button>

              <button 
                onClick={() => {
                  const url = window.location.href;
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>

              <button 
                onClick={() => {
                  const url = window.location.href;
                  const text = `${news.title} - CAVEM`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </button>

              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('¡Enlace copiado al portapapeles!');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar enlace
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón de volver al final */}
      <div className="flex justify-center">
        <Link to="/noticias">
          <Button variant="outline" size="lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a todas las noticias
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoticiaDetalle;