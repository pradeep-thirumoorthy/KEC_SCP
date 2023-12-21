import CryptoJS from 'crypto-js';
import axios from 'axios';

const checkEmail = async () => {
  const storedEmail = sessionStorage.getItem('AdminEmail');
  if (storedEmail) {
    const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, 'admin-_?info').toString(CryptoJS.enc.Utf8);

    try {
      const response = await axios.get(`http://localhost:8000/Facultycheck.php?email=${encodeURIComponent(decryptedEmail)}`);
      return response.data.present;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }
  return false;
};

export default checkEmail;
