const baseUrl = "http://localhost:3000";

interface Credentials {
  username: string;
  password: string;
}

export const loginUser = async (credentials: Credentials) => {
  const response = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const createNewUser = async (
  credentials: Credentials & { fullName: string },
) => {
  const response = await fetch(`${baseUrl}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const incrementPoints = async (username: string) => {
  const response = await fetch(`${baseUrl}/api/users/${username}`, {
    method: "PUT",
  });
  const data = await response.json();
  return data;
};
