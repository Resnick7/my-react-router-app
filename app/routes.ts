import type { RouteConfig } from "@react-router/dev/routes"
import { index, route } from "@react-router/dev/routes"

export default [
  index('./routes/about.tsx'),
  route('/horarios', './routes/horarios.tsx'),
  route('/noticias', './routes/noticias.tsx'),
  route('/torneos', './routes/torneos.tsx'),
  route('/resultados', './routes/resultados.tsx'),
] satisfies RouteConfig