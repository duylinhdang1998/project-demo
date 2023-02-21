import { Staff } from 'services/models/Staff';
import { CreateDayOff } from 'services/Staff/Company/createDayOff';

// Create dayoffs
export interface RemoveDayActiveRequest {
  data: CreateDayOff;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface RemoveDayActiveSuccess {
  data: Staff;
}

export interface RemoveDayActiveFailure {}
