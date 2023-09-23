// AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
    const storedAuthStatus = Cookies.get('isAuthenticated');
    if (storedAuthStatus) {
      setIsAuthenticated(JSON.parse(storedAuthStatus));
    }
  }, []);

  const login = (email) => {
    
    setIsAuthenticated(true);
    Cookies.set('isAuthenticated', true, { expires: 1 });
    const Emailscm = CryptoJS.AES.encrypt(email,"admin-_?info").toString();
    Cookies.set('AdminEmail',Emailscm,{expires:1})
    Cookies.remove('isStudentAuthenticated');
    Cookies.remove('StudentEmail');
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove('isAuthenticated');
    Cookies.remove('AdminEmail');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
