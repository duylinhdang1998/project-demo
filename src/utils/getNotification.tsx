import ToastCustom from 'components/ToastCustom/ToastCustom';
import { toast } from 'react-toastify';
import { ServiceException } from 'services/utils/ServiceException';

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
    toast(<ToastCustom type="error" text={error ?? ''} description={ServiceException.getMessageError(code)} />, {
      className: 'toast-error',
      autoClose: 2000,
    });
    return;
  }
};
