import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
const checkEmail = () => {
    const storedEmail = Cookies.get('AdminEmail');
    if (storedEmail) {
      const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, "admin-_?info").toString(CryptoJS.enc.Utf8);
      return decryptedEmail === "pradeept.21cse@kongu.edu";
    }
    return false;
  };
export default checkEmail;
