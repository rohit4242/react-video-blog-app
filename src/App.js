import "./App.css";
import SignIn from "./Container/SignIn/SignIn";
import SignUp from "./Container/SignUp/SignUp";

import Home from "./Container/Home/Home";
import PageNotFound from "./Container/NotFound/PageNotFound";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser, userAccessToken } from "./Utils/fetchUser";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = userAccessToken();
    if (!accessToken) {
      navigate("/signin", { replace: true });
    }
    else{
      const [userInfo] = fetchUser();
      setUser(userInfo);
    }
  }, []);

  return (
    <Routes>
      <Route path="signIn" element={<SignIn />} />
      <Route path="signUp" element={<SignUp />} />

      <Route path="/*" element={<Home user={user} />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
