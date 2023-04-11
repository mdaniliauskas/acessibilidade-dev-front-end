import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// navbar fixo para todas as paginas
import Navbar from "../components/Navbar";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route path="/artigos" element={<p>Artigos</p>} />
      <Route path="/ferramentas" element={<p>Ferramentas</p>} />
      <Route path="/forum" element={<p>Fórum</p>} />
      <Route path="/noticias" element={<p>Noticias</p>} />
    </Route>
  )
);
