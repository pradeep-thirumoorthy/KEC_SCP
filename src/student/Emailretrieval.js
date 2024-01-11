import CryptoJS from 'crypto-js';

export const geteduEmailFromSession = () => {
  const encryptedEmail = sessionStorage.getItem('StudentEmail');
  if (encryptedEmail) {
    const bytes = CryptoJS.AES.decrypt(encryptedEmail, 'student-_?info');
    const email = bytes.toString(CryptoJS.enc.Utf8);
    return email;
  }
  return '';
};