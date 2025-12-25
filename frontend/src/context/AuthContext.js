import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
  };

  const value = {
    user,
    login
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
