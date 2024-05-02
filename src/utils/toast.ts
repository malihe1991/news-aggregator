import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const toast = (text, type = 'error') => {
  const toastType = type === 'error' ? '#DF1D17' : '#22A958';

  Toastify({
    text,
    duration: 5000,
    newWindow: true,
    style: {
      background: toastType,
      borderRadius: 5,
    },
  }).showToast();
};
