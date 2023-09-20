import ToastCustom from 'components/ToastCustom/ToastCustom';
import fileDownload from 'js-file-download';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { exportTicketSales } from 'services/Report/exportTicketSales';

export const useExportTicketSales = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      await exportTicketSales().then(res => {
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
