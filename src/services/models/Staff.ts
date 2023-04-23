import { DayInWeek } from './DayInWeek';
import { Office } from './Office';
import { ImageResource } from './Resource';
import { UserRole } from './UserRole';

export interface Staff {
  _id: string;
  company: string;
  office: Office;
  role: UserRole;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  attach: ImageResource;
  presenceDay: Array<DayInWeek>;
  dayOff: number[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  periodFrom: null | string | number;
  periodTo: null | string | number;
  dayExceptions: number[];
}
