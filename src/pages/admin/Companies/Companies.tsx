import { Box } from '@mui/system';
import { DatePicker } from 'antd';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { isFrLanguage } from 'utils/isFrLanguage';
import frLocale from 'antd/es/date-picker/locale/fr_FR';
import enLocale from 'antd/es/date-picker/locale/en_US';
import './styles.scss';
import { InputLabel, Stack } from '@mui/material';
import { useGetListCompanies } from 'services/Companies/companies';
import { useMount, useUpdateEffect } from 'ahooks';
import Select, { components } from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { SubscriptionEnum } from 'models/Subscription';
import { customStyles } from 'components/FilterTicket/customStyles';
import moment from 'moment';
import TableCompanies from './TableCompanies';

interface Values {
  subscription?: SubscriptionEnum;
  search?: string;
  registerDate?: string;
}

const options = [
  { key: uuidv4(), value: SubscriptionEnum.TRIAL, label: SubscriptionEnum[SubscriptionEnum.TRIAL] },
  { key: uuidv4(), value: SubscriptionEnum.STANDARD, label: SubscriptionEnum[SubscriptionEnum.STANDARD] },
  { key: uuidv4(), value: SubscriptionEnum.PRO, label: SubscriptionEnum[SubscriptionEnum.PRO] },
  { key: uuidv4(), value: SubscriptionEnum.ENTERPRISE, label: SubscriptionEnum[SubscriptionEnum.ENTERPRISE] },
];

export default function Companies() {
  const { t } = useTranslation(['translation', 'sidebar']);
  const navigate = useNavigate();

  const { data, loading, run, refresh } = useGetListCompanies();

  useMount(() => {
    run({
      page: 0,
      searcher: {
        subscription: {
          value: SubscriptionEnum.STANDARD,
          operator: 'contains',
        },
      },
      sorter: {},
    });
  });

  const { watch, setValue } = useForm<Values>({
    defaultValues: {
      subscription: SubscriptionEnum.STANDARD,
    },
  });
  const search = watch('search');
  const subscription = watch('subscription');
  const registerDate = watch('registerDate');

  useUpdateEffect(() => {
    run({
      page: 1,
      searcher: {
        name: {
          value: search?.trim(),
          operator: 'contains',
        },
        subscription: {
          value: subscription,
          operator: 'contains',
        },
        createdAt: {
          value: registerDate,
          operator: 'gte',
        },
      },
      sorter: {},
    });
  }, [search, subscription, registerDate]);

  const handleChangeDate = (value: moment.Moment | null, dateString: string) => {
    setValue('registerDate', dateString);
  };

  const handleSearch = (val: string) => {
    setValue('search', val);
  };
  const handleSelect = (newValue: any) => {
    setValue('subscription', newValue.value as SubscriptionEnum);
  };

  return (
    <div className="companies">
      <HeaderLayout activeSideBarHeader={t('sidebar:companies')} />
      <Stack spacing="24px" padding="24px" direction="row" alignItems="flex-end">
        <BoxSearch isShowAdd={false} onSearch={handleSearch} />
        <Box>
          <InputLabel className="register_date">{t('register_date')}</InputLabel>
          <DatePicker
            showTime={false}
            format="MM-DD-YYYY"
            locale={isFrLanguage() ? frLocale : enLocale}
            placeholder={t('register_date')}
            value={!!registerDate ? moment(registerDate) : undefined}
            onChange={handleChangeDate}
            className="custom-datepicker"
          />
        </Box>
        <Box>
          <InputLabel className="register_date">{t('subscription')}</InputLabel>
          <Select
            value={options.find(item => item.value === subscription)}
            options={options}
            className="custom-select"
            styles={customStyles}
            onChange={handleSelect}
            components={{
              Option: (props: any) => {
                return <components.Option {...props}>{t(`${props.label}`)}</components.Option>;
              },
              SingleValue: props => {
                return <components.SingleValue {...props}>{t(`${props.children}`)}</components.SingleValue>;
              },
            }}
          />
        </Box>
      </Stack>
      <Box padding="24px">
        <TableCompanies
          dataSource={data?.data.hits}
          isLoading={loading}
          pagination={data?.data.pagination}
          onRefresh={refresh}
          onFilter={({ page, sorter }) => {
            run({
              page,
              sorter,
              searcher: {
                name: {
                  value: search?.trim(),
                  operator: 'contains',
                },
                subscription: {
                  value: subscription,
                  operator: 'contains',
                },
                createdAt: {
                  value: registerDate,
                  operator: 'gte',
                },
              },
            });
          }}
        />
      </Box>
    </div>
  );
}
