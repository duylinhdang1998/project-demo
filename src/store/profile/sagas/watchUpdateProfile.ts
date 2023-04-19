import { put, retry, takeLatest } from 'redux-saga/effects';
import { updateProfile } from 'services/Company/updateProfile';
import { ServiceException } from 'services/utils/ServiceException';
import { profileActions } from '../../profile/profileSlice';

function* handleUpdateProfile({ payload }: ReturnType<typeof profileActions.updateProfileRequest>) {
  const { data, targetProfile, onSuccess, onFailure } = payload;
  try {
    yield retry(3, 1000, updateProfile, data);
    yield put(
      profileActions.updateProfileSuccess({
        data: {
          ...targetProfile,
          name: data.name,
          address: data.address,
          zipCode: data.zipCode,
          city: data.city,
          country: data.country,
          transportLicense: data.transportLicense,
          profileImage: data.profileImage,
          logoImage: data.logoImage,
          phone: data.phone,
        },
      }),
    );
    onSuccess();
  } catch (error) {
    yield put(profileActions.updateProfileFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateProfile() {
  yield takeLatest(profileActions.updateProfileRequest, handleUpdateProfile);
}
