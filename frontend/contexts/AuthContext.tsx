import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  areaCode?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("shopUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("shopUser", JSON.stringify(userData));
    localStorage.setItem("shopAuthToken", userData.token || "");
    router.push("/profile");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shopUser");
    localStorage.removeItem("shopAuthToken");
    router.push("/");
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("shopUser", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
