import ToastCustom from 'components/ToastCustom/ToastCustom';
import { toast } from 'react-toastify';

interface Params {
  code: number;
  success?: string;
  error?: string;
  onSuccess?: () => void;
}

export const getNotifcation = ({ code, success, error, onSuccess }: Params) => {
  if (code === 0) {
    toast(<ToastCustom type="success" text={success ?? ''} />, {
      className: 'toast-success',
      autoClose: 2000,
    });
    onSuccess?.();
  } else {
    toast(<ToastCustom type="error" text={error ?? ''} />, {
      className: 'toast-error',
      autoClose: 2000,
    });
    return;
  }
};
