import { Links, Meta, Outlet, Scripts } from 'react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Link, useLocation } from 'react-router';
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
  
  // Determinar qué pestaña está activa basándose en la ruta actual
  const getActiveTab = () => {
    if (location.pathname === '/horarios') return 'horarios';
    if (location.pathname === '/noticias') return 'noticias';
    if (location.pathname === '/torneos') return 'torneos';
    if (location.pathname === '/resultados') return 'resultados';
    return 'quienes-somos'; // Por defecto
  };

  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">CAVEM</h1>
            <p className="text-gray-600 mt-2">¡Bienvenidos!</p>
          </header>

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

          <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>© 2025 CAVEM</p>
          </footer>
        </div>

        <Scripts />
      </body>
    </html>
  );
}