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
import TopicDetails from "../pages/Forum/TopicDetails";
import NewChat from "../pages/Chat/NewChat/index.jsx";
import ChatDetails from "../pages/Chat/ChatDetails/index.jsx";
import ListChats from "../pages/Chat/ListChats/index.jsx";
import Chat from "../pages/OpenIA/Chat";
import UpdateTopic from "../pages/Forum/UpdateTopic";
import PrivateRoute from "./PrivateRoute";

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route path="/artigos" element={<p>Artigos</p>} />
      <Route path="/ferramentas" element={<p>Ferramentas</p>} />
      <Route path="/noticias" element={<p>Noticias</p>} />

      <Route path="/forum" element={<ListTopics />} />
      <Route
        path="/forum/novo-topico"
        element={
          <PrivateRoute>
            <NewTopic />
          </PrivateRoute>
        }
      />
      <Route path="/forum/topico/:topicId" element={<TopicDetails />} />
      <Route path="/forum/editar-topico/:topicId" element={<UpdateTopic />} />

      <Route path="/completarCadastro" element={<Register />} />

      <Route path="/chat" element={<ListChats />} />
      <Route
        path="/chat/novo-chat"
        element={
          <PrivateRoute>
            <NewChat />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat/:chatId"
        element={
          <PrivateRoute>
            <ChatDetails />
          </PrivateRoute>
        }
      />

      <Route path="/openIA" element={<Chat />} />
    </Route>
  )
);
