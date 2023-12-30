import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const StudentAuthContext = createContext();

export function StudentAuthProvider({ children }) {
  const [isStudentAuthenticated, setIsStudentAuthenticated] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('StudentEmail')) {
      setIsStudentAuthenticated(true);
    }
    else{
      if(Cookies.get('StudentEmail')){
        const Email=Cookies.get('StudentEmail');
        sessionStorage.setItem('StudentEmail',Email);
        
        setIsStudentAuthenticated(true);
      }
      else{
        setIsStudentAuthenticated(false);
        console.log("There is no more log");
      }
    }
  }, []);

  const studentLogin = (email) => {
    setIsStudentAuthenticated(true);
    Cookies.set('isStudentAuthenticated', true, { expires: 1 });
    const encryptedEmail = CryptoJS.AES.encrypt(email, 'student-_?info').toString();
    Cookies.set('StudentEmail', encryptedEmail, { expires: 1 });
    sessionStorage.setItem('StudentEmail', encryptedEmail);
    Cookies.remove('AdminEmail');
  };

  const logout = () => {
    setIsStudentAuthenticated(false);
    Cookies.remove('isStudentAuthenticated');
    Cookies.remove('StudentEmail');
    sessionStorage.removeItem('StudentEmail'); // Clear the encrypted email from sessionStorage on logout
  };

  return (
    <StudentAuthContext.Provider value={{ isStudentAuthenticated, studentLogin, logout}}>
      {children}
    </StudentAuthContext.Provider>
  );
}

export function useStudentAuth() {
  return useContext(StudentAuthContext);
}
