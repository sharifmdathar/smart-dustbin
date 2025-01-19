import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, setUser] = useState({ username: "", points: 0 });
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) setUser(JSON.parse(loggedUserJSON));
  }, []);

  return user.username !== ""
    ? <>{user.username} logged in</>
    : <LoginForm setUser={setUser} />;
};
export default App;
