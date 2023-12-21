// AuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('AdminEmail')) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email) => {
    
    setIsAuthenticated(true);
    Cookies.set('isAuthenticated', true, { expires: 1 });
    const Emailscm = CryptoJS.AES.encrypt(email,"admin-_?info").toString();
    Cookies.set('AdminEmail',Emailscm,{expires:1})
    sessionStorage.setItem('AdminEmail',Emailscm);
    sessionStorage.setItem('PanelTrigger',false);
    Cookies.remove('StudentEmail');
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove('isAuthenticated');
    Cookies.remove('AdminEmail');
    sessionStorage.removeItem('AdminEmail');
  };
  const CheckAuth = () => {
    if(!sessionStorage.getItem('AdminEmail')){
      if(Cookies.get('AdminEmail')){
        const Email=Cookies.get('AdminEmail');
        sessionStorage.setItem('AdminEmail',Email);
        
        setIsAuthenticated(true);
      }
      else{
        setIsAuthenticated(false);
        console.log("There is no more log");
      }
    }
    else{
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,CheckAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
