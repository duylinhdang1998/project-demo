import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { packageSettingsActions } from 'store/packageSettings/packageSettingsSlice';
import { selectPackageSettings } from 'store/packageSettings/selectors';
import TablePackageSettings from './components/TablePackageSettings';

export default function PackageSettings() {
  const { t } = useTranslation(['packageSettings', 'translation']);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentSearcher } = useAppSelector(selectPackageSettings);

  const handleAdd = () => {
    navigate('/admin/add-package-setting');
  };

  useEffect(() => {
    dispatch(
      packageSettingsActions.getPackageSettingsRequest({
        page: 0,
        sorter: {},
        searcher: {},
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('packageSettings:package_settings')} />
      <Box padding="24px">
        <BoxSearch
          searchValue={currentSearcher.title?.value as string | undefined}
          onSearch={value => {
            dispatch(
              packageSettingsActions.getPackageSettingsRequest({
                page: 0,
                sorter: {},
                searcher: {
                  title: { value, operator: 'contains' },
                },
              }),
            );
          }}
          onAdd={handleAdd}
          addTextButton={t('translation:create_new', { type: t('packageSettings:package_settings_lowercase') })}
        />
        <TablePackageSettings />
      </Box>
    </Box>
  );
}
