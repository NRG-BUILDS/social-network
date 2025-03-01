import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import MainLayout from "./layouts/main-layout";
import Signin from "./pages/(auth)/signin";
import Feed from "./pages/feed";
import Post from "./pages/post";
import MessagesLayout from "./layouts/messages-layout";
import Messages from "./pages/messages";
import ProfileLayout from "./layouts/profile-layout";
import Chat from "./pages/messages/chat";
import SignUp from "./pages/(auth)/signup";
import VerifyEmail from "./pages/(auth)/verifyemail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "./store/store";
import useRequest from "./hooks/useRequest";
import { setUser } from "./store/authSlice";
import { User } from "./types/user";

function App() {
  const { email, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const { makeRequest } = useRequest("");
  const getUserProfile = async (email: string) => {
    console.log("signed in with", email);
    const res = await makeRequest(
      undefined,
      undefined,
      undefined,
      `/profiles/profile/emmanuel-omolaju` //replace this with dynamic value from the login response later
    );
    if (res.status === "success") {
      let user: User = res.data;

      dispatch(setUser({ user: user }));
      console.log(res);
    }
  };

  useEffect(() => {
    if (isAuthenticated && email) {
      getUserProfile(email);
    }
  }, [isAuthenticated, email]);
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/login" element={<Signin />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/verify/:email" element={<VerifyEmail />}></Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Feed />}></Route>
          <Route path="/home" element={<Feed />}></Route>
          <Route path="/post/:slug" element={<Post />}></Route>
        </Route>
        <Route element={<MessagesLayout />}>
          <Route path="/messages" element={<Messages />}></Route>
          <Route path="/messages/:chatId" element={<Chat />}></Route>
        </Route>
        <Route element={<ProfileLayout />}>
          <Route path="/profile" element={<Feed />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
