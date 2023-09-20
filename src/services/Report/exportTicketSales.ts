import fetchAPI from 'utils/fetchAPI';

export const exportTicketSales = () => {
  return fetchAPI.request({
    url: '/v1.0/company/report/ticket/export',
    responseType: 'blob',
  });
};
