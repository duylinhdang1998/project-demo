import { Staff } from 'services/models/Staff';
import { CreateDayExceptions } from 'services/Staff/Company/createDayExceptions';
import { CreateDayOff } from 'services/Staff/Company/createDayOff';

export interface UpdateDayOffNDayExceptionsLocal {
  dayOff?: Staff['dayOff'];
  dayExceptions?: Staff['dayExceptions'];
}

// Create dayoffs
export interface UpdateDayOffNDayExceptionsRequest {
  data: CreateDayOff & CreateDayExceptions;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface UpdateDayOffNDayExceptionsSuccess {
  data: Staff;
}

export interface UpdateDayOffNDayExceptionsFailure {}
