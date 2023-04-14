import { Staff } from 'services/models/Staff';
import { CreateDayOff } from 'services/Staff/Company/createDayOff';

export interface UpdateDayOffLocal {
  dayOff: Staff['dayOff'];
}

// Create dayoffs
export interface UpdateDayOffRequest {
  data: CreateDayOff;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface UpdateDayOffSuccess {
  data: Staff;
}

export interface UpdateDayOffFailure {}
