import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { BASE_URL } from "../constants.jsx";

const cookies = new Cookies(null, { path: "/" });

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      fetch(BASE_URL + "/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Token verification failed");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data.user);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(BASE_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      const token = data.token;
      cookies.set("token", token, { maxAge: 3600 });
      setUser(data.user);
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Login failed");
    }
  };
  const updateUser = async (userId, username) => {
    setLoading(true);

    const response = await fetch(BASE_URL + "/updateUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, newUsername: username }),
    });
    if (!response.ok) {
      setLoading(false);
      throw new Error("Update failed");
    }
    const data = await response.json();

    setLoading(false);
    setUser(data.user);
  };
  const register = async (username, email, password) => {
    try {
      setLoading(true);
      const response = await fetch(BASE_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error("Registration failed");
      }
      const data = await response.json();
      const token = data.token;

      cookies.set("token", token, { maxAge: 3600 });
      setLoading(false);
      setUser(data.user);
    } catch (error) {
      setLoading(false);
      console.error("Error registering:", error);
    }
  };

  const logout = () => {
    cookies.remove("token");
    setUser(null);
  };

  return { user, loading, login, register, logout, updateUser };
};

export default useAuth;
