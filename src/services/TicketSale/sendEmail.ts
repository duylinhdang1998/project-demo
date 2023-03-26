import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { TicketSale } from 'services/models/TicketSale';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  id: '19';
  name: 'send-mails';
  data: [
    {
      subject: 'Thông tin vé của bạn';
      template: 'order-detail';
      recipients: ['hoangducmanh3298@gmail.com'];
      context: {
        email: 'hoangducmanh3298@gmail.com';
        orderCode: '63111486';
        type: 'TICKET';
      };
    },
  ];
  opts: {
    attempts: 1;
    delay: 0;
    timestamp: 1679749450620;
  };
  progress: 0;
  delay: 0;
  timestamp: 1679749450620;
  attemptsMade: 0;
  stacktrace: [];
  returnvalue: null;
  finishedOn: null;
  processedOn: null;
}

export interface SendEmail {
  orderCode: TicketSale['orderCode'];
}

export const sendEmail = async ({ orderCode }: SendEmail) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/ticket-sales/send-mails',
    data: { orderCode },
  });

  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
