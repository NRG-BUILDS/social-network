import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import Signin from "./pages/(auth)/signin";
import Feed from "./pages/feed";
import Post from "./pages/post";
import MessagesLayout from "./layouts/messages-layout";
import Messages from "./pages/messages";
import ProfileLayout from "./layouts/profile-layout";
import Chat from "./pages/messages/chat";
import SignUp from "./pages/(auth)/signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Signin />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/post/:id" element={<Post />}></Route>
          </Route>
          <Route element={<MessagesLayout />}>
            <Route path="/messages" element={<Messages />}></Route>
            <Route path="/messages/:chatId" element={<Chat />}></Route>
          </Route>
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<Feed />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
