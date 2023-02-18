import { Box } from '@mui/material';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { officesManagerActions } from 'store/officesManager/officesManagerSlice';
import { selectOfficesManager } from 'store/officesManager/selectors';
import TableOfficesManager from './components/TableOfficesManager';

export default function OfficeManager() {
  const { t } = useTranslation(['account', 'translation']);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentSearcher } = useAppSelector(selectOfficesManager);

  const handleAdd = () => {
    navigate('/account/add-office-manager');
  };

  useEffect(() => {
    dispatch(
      officesManagerActions.getOfficesRequest({
        page: 0,
        sorter: {},
        searcher: {},
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FIXME: Retry screen

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('account:offices_manager')} />
      <Box padding="24px">
        <BoxSearch
          searchValue={currentSearcher.title}
          onSearch={value => {
            dispatch(
              officesManagerActions.getOfficesRequest({
                page: 0,
                sorter: {},
                searcher: { title: value },
              }),
            );
          }}
          onAdd={handleAdd}
          addTextButton={t('translation:create_new', { type: t('account:office') })}
        />
        <TableOfficesManager />
      </Box>
    </Box>
  );
}
