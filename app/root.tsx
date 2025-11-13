import { Links, Meta, Outlet, Scripts } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Link, useLocation } from 'react-router';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './lib/apollo-client';
import './app.css';
import type { Route } from './+types/root';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap',
  },
];

export const meta: Route.MetaFunction = () => [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { title: 'CAVEM' },
];

export default function Root() {
  const location = useLocation();
  
  // Determinar si estamos en una ruta de detalle
  const isDetailRoute = location.pathname.match(/^\/noticias\/[^/]+$/);
  
  const getActiveTab = () => {
    if (location.pathname.startsWith('/horarios')) return 'horarios';
    if (location.pathname.startsWith('/noticias')) return 'noticias';
    if (location.pathname.startsWith('/torneos')) return 'torneos';
    if (location.pathname.startsWith('/resultados')) return 'resultados';
    return 'quienes-somos';
  };

  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-linear-to-br from-gray-900 to-red-950">
        <ApolloProvider client={apolloClient}>
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            <header className="mb-8 text-center">
              <Link to="/" className="inline-block">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-300">CAVEM</h1>
                <p className="text-gray-500 mt-2">Confederación de Atletas Veteranos de Mendoza</p>
              </Link>
            </header>

            {/* Si estamos en una ruta de detalle, no mostrar las tabs */}
            {isDetailRoute ? (
              <div className="space-y-4">
                <Outlet />
              </div>
            ) : (
              <Tabs value={getActiveTab()} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="quienes-somos" asChild>
                    <Link to="/" className="w-full text-center">Quienes somos</Link>
                  </TabsTrigger>
                  <TabsTrigger value="horarios" asChild>
                    <Link to="/horarios" className="w-full text-center">Horarios</Link>
                  </TabsTrigger>
                  <TabsTrigger value="noticias" asChild>
                    <Link to="/noticias" className="w-full text-center">Noticias</Link>
                  </TabsTrigger>
                  <TabsTrigger value="torneos" asChild>
                    <Link to="/torneos" className="w-full text-center">Torneos</Link>
                  </TabsTrigger>
                  <TabsTrigger value="resultados" asChild>
                    <Link to="/resultados" className="w-full text-center">Resultados</Link>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="quienes-somos" className="space-y-4">
                  <Outlet />
                </TabsContent>

                <TabsContent value="horarios" className="space-y-4">
                  <Outlet />
                </TabsContent>
                
                <TabsContent value="noticias" className="space-y-4">
                  <Outlet />
                </TabsContent>
                
                <TabsContent value="torneos" className="space-y-4">
                  <Outlet />
                </TabsContent>

                <TabsContent value="resultados" className="space-y-4">
                  <Outlet />
                </TabsContent>
              </Tabs>
            )}

            <footer className="mt-12 text-center text-gray-500 text-sm">
              <div className="flex items-center justify-center gap-4 mb-2">
                <a 
                  href="https://www.instagram.com/cavem.atletismo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <p>© 2025 CAVEM</p>
              </div>  
            </footer>
          </div>
        </ApolloProvider>

        <Scripts />
      </body>
    </html>
  );
}