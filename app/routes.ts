import type { RouteConfig } from "@react-router/dev/routes"
import { index, route } from "@react-router/dev/routes"

export default [
  index('./components/WhoWeAre.tsx'),
  route('/horarios', './components/Horarios.tsx'),
  route('/noticias', './components/Noticias.tsx'),
  route('/torneos', './components/Torneos.tsx'),
  route('/resultados', './components/Resultados.tsx'),
] satisfies RouteConfig