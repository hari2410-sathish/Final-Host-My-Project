import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Load actual user from backend using token
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await getCurrentUser(token);
        setUser(res.data);
      } catch (err) {
        console.log("Auth load error:", err);
        localStorage.removeItem("token");
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = (data) => {
    setToken(data.token);
    localStorage.setItem("token", data.token);

    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
