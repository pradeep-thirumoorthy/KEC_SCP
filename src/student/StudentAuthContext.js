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
    const encryptedEmail = CryptoJS.AES.encrypt(email, 'student-_?info').toString();
    Cookies.set('StudentEmail', encryptedEmail, { expires: 1 });
    sessionStorage.setItem('StudentEmail', encryptedEmail); // Store encrypted email in sessionStorage
    Cookies.remove('isAuthenticated');
    Cookies.remove('AdminEmail');
  };

  const logout = () => {
    setIsStudentAuthenticated(false);
    Cookies.remove('isStudentAuthenticated');
    Cookies.remove('StudentEmail');
    sessionStorage.removeItem('StudentEmail'); // Clear the encrypted email from sessionStorage on logout
  };

  return (
    <StudentAuthContext.Provider value={{ isStudentAuthenticated, studentLogin, logout }}>
      {children}
    </StudentAuthContext.Provider>
  );
}

export function useStudentAuth() {
  return useContext(StudentAuthContext);
}
