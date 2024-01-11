import CryptoJS from 'crypto-js';

export const getEmailFromSession = () => {
  const encryptedEmail = sessionStorage.getItem('AdminEmail');
  if (encryptedEmail) {
    const bytes = CryptoJS.AES.decrypt(encryptedEmail, 'admin-_?info');
    const email = bytes.toString(CryptoJS.enc.Utf8);
    return email;
  }
  return '';
};