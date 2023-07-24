// "{\"orderCode\":\"915320500\"}"
export const getOrderCodeFromScanQr = (data: string) => {
  try {
    const json = JSON.parse(data);
    return json.orderCode;
  } catch {
    return '';
  }
};
