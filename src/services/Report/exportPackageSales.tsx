import ToastCustom from 'components/ToastCustom/ToastCustom';
import fileDownload from 'js-file-download';
import { useState } from 'react';
import { toast } from 'react-toastify';
import fetchAPI from 'utils/fetchAPI';

export const exportPackageSales = () => {
  return fetchAPI.request({
    url: '/v1.0/company/report/package/export',
    responseType: 'blob',
  });
};

export const useExportPackageSales = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      await exportPackageSales().then(res => {
        fileDownload(res.data, `Report_${new Date().toLocaleString('en-US')}.csv`);
      });
    } catch {
      toast(<ToastCustom type="error" text="" />);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    exportPdf: handleExport,
    isLoading,
  };
};
