import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// navbar fixo para todas as paginas
import Navbar from "../components/Navbar";

// paginas
import Register from "../pages/Register";
import NewTopic from "../pages/Forum/NewTopic";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route path="/artigos" element={<p>Artigos</p>} />
      <Route path="/ferramentas" element={<p>Ferramentas</p>} />
      <Route path="/forum" element={<NewTopic />} />
      <Route path="/noticias" element={<p>Noticias</p>} />
      <Route path="/completarCadastro" element={<Register />} />
    </Route>
  )
);
