import React, { createContext, useContext, useEffect, useState } from "react";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

type AuthContextType = {
  isAuthenticated: boolean;
  accessToken: string | undefined;
  checkAuth: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: undefined,
  checkAuth: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  const checkAuth = () => {
    const token = getCookie("access_token");
    setAccessToken(token);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    document.cookie = "access_token=; Max-Age=0; path=/;";
    setAccessToken(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        accessToken,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
