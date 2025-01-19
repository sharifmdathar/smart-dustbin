import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import { incrementPoints } from "./services/userService";

const App = () => {
  const [user, setUser] = useState({ fullName: "", username: "", points: 0 });
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      let parsedUser = JSON.parse(loggedUserJSON);
      setUser(parsedUser);
      incrementPoints(parsedUser.username)
        .then((data) => {
          if (data.success) parsedUser = data.user;
          setUser(parsedUser);
        });
    }
  }, []);

  return user.username === ""
    ? <LoginForm setUser={setUser} />
    : <Dashboard user={user} />;
};
export default App;
