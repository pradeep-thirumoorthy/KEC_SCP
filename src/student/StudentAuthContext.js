// StudentAuthContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const StudentAuthContext = createContext();

export function StudentAuthProvider({ children }) {
  const [isStudentAuthenticated, setIsStudentAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuthStatus = Cookies.get('isStudentAuthenticated');
    if (storedAuthStatus) {
      setIsStudentAuthenticated(JSON.parse(storedAuthStatus));
    }
  }, []);

  const studentLogin = (email) => {
    setIsStudentAuthenticated(true);
    Cookies.set('isStudentAuthenticated', true, { expires: 1 });
    const Emailscm = CryptoJS.AES.encrypt(email, "student-_?info").toString();
    Cookies.set('StudentEmail', Emailscm, { expires: 1 });
    Cookies.remove('isAuthenticated');
    Cookies.remove('AdminEmail');
  };

  const studentLogout = () => {
    setIsStudentAuthenticated(false);
    Cookies.remove('isStudentAuthenticated');
    Cookies.remove('StudentEmail');
  };

  return (
    <StudentAuthContext.Provider value={{ isStudentAuthenticated, studentLogin, studentLogout }}>
      {children}
    </StudentAuthContext.Provider>
  );
}

export function useStudentAuth() {
  return useContext(StudentAuthContext);
}
