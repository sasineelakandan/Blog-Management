import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import MyBlogs from "./pages/MyBlogs";
import EditPost from "./pages/EditPost";

function App() {
  const [token, setToken] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const isToken = localStorage.getItem('user');
    if (isToken) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [location]); // no need to depend on `token` here

  return (
    <div>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
          <Route path="/write" element={token ? <CreatePost /> : <Navigate to="/" />} />
          <Route path="/posts/post/:id" element={token ? <PostDetails /> : <Navigate to="/" />} />
          <Route path="/myblogs/:id" element={token ? <MyBlogs /> : <Navigate to="/" />} />
          <Route path="/edit/:id" element={token ? <EditPost /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </UserContextProvider>
    </div>
  );
}

export default App;
