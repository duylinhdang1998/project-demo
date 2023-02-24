import { Staff } from 'services/models/Staff';
import { CreateDayOff } from 'services/Staff/Company/createDayOff';

// Create dayoffs
export interface ToggleDayActiveRequest {
  type: 'createDayOff' | 'removeDayOff';
  data: CreateDayOff;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface ToggleDayActiveSuccess {
  data: Staff;
}

export interface ToggleDayActiveFailure {}
