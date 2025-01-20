import { useState } from "react";
import Info from "./Info.tsx";
import { createNewUser, loginUser } from "../services/userService";

interface LoginFormProps {
  setUser: (user: any) => void;
}

const LoginForm = ({ setUser }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [info, setInfo] = useState({ message: "", status: "" });
  const [newAccount, setNewAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      return setInfo({
        message: "All fields are Necessary",
        status: "error",
      });
    }
    const data = await loginUser({ username, password });
    if (data.error) {
      setInfo({ message: data.error, status: "error" });
    } else {
      setUser(data);
      window.localStorage.setItem("loggedInUser", JSON.stringify(data));
      window.location.reload();
    }
  };

  const handleNewAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fullName || !username || !password) {
      return setInfo({
        message: "All fields are Necessary",
        status: "error",
      });
    }
    const data = await createNewUser({ username, password, fullName });
    if (data.error) {
      setInfo({ message: data.error, status: "error" });
    } else {
      setUser(data);
      window.localStorage.setItem("loggedInUser", JSON.stringify(data));
      window.location.reload();
    }
  };

  return (
    <>
      <form className="login-container">
        <Info info={info} />
        {newAccount && (
          <p>
            Full name{" "}
            <input
              type="text"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
          </p>
        )}
        <label>
          username{" "}
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <p>
          <label>
            password{" "}
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </p>
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleShowPass}
          />{" "}
          Show Password
        </label>
        {!newAccount
          ? <button onClick={handleLogin}>login</button>
          : <button onClick={handleNewAccount}>create account</button>}
        <button
          onClick={(e) => {
            e.preventDefault();
            setNewAccount(!newAccount);
          }}
        >
          {newAccount ? "cancel" : "create new account"}
        </button>
      </form>
      <br />
    </>
  );
};

export default LoginForm;
