import { useState } from "react";
import Info from "./Info.tsx";
import { loginUser } from "../services/userService";

const LoginForm = () => {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [info, setInfo] = useState({ message: "", status: "" });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await loginUser({ username, password });
    if (data.error) {
      setInfo({ message: data.error, status: "error" });
    } else {
      setInfo({ message: `welcome back ${data.username}!`, status: "success" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Info info={info} />
      <p>
        username{" "}
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </p>
      <p>
        password{" "}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </p>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
