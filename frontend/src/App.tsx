import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [user, setUser] = useState({ username: "", points: 0 });
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) setUser(JSON.parse(loggedUserJSON));
  }, []);

  return user.username === ""
    ? <LoginForm setUser={setUser} />
    : <Dashboard user={user} />;
};
export default App;
