import { PickerDateProps } from 'antd/lib/date-picker/generatePicker';
import dayjs, { Dayjs } from 'dayjs';

export const disabledDate: PickerDateProps<Dayjs>['disabledDate'] = current => {
  // Can not select days before today and today
  return current && current < dayjs().startOf('day');
};
