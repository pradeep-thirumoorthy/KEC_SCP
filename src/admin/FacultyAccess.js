import CryptoJS from 'crypto-js';
import axios from 'axios';

const checkEmail = () => {
  const storedEmail = sessionStorage.getItem('AdminEmail');
  if (storedEmail) {
    const decryptedEmail = CryptoJS.AES.decrypt(storedEmail, 'admin-_?info').toString(CryptoJS.enc.Utf8);

    return axios.get(`http://localhost:8000/Facultycheck.php?email=${encodeURIComponent(decryptedEmail)}`)
      .then((response) => {
        //console.log('Faculty:' + JSON.stringify(response.data.present));
        return response.data.present;
      })
      .catch((error) => {
        console.error('Error checking email:', error);
        return false;
      });
  }
  return Promise.resolve(false);
};

export default checkEmail;
