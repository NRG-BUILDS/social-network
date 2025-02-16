import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import Signin from "./pages/(auth)/signin";
import Feed from "./pages/feed";
import Post from "./pages/post";
import MessagesLayout from "./layouts/messages-layout";
import Messages from "./pages/messages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Signin />}></Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/post/:id" element={<Post />}></Route>
            {/* <Route path="*" element={<div>Helllo world</div>}></Route> */}
          </Route>
          <Route element={<MessagesLayout />}>
            <Route path="/messages" element={<Messages />}></Route>
            {/* <Route path="*" element={<div>Helllo world</div>}></Route> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
