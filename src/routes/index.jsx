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
import ListTopics from "../pages/Forum/ListTopics";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route path="/artigos" element={<p>Artigos</p>} />
      <Route path="/ferramentas" element={<p>Ferramentas</p>} />

      <Route path="/forum" element={<ListTopics />} />
      <Route path="/forum/novo-topico" element={<NewTopic />} />

      <Route path="/noticias" element={<p>Noticias</p>} />
      <Route path="/completarCadastro" element={<Register />} />
    </Route>
  )
);
