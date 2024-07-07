import React, { useState } from 'react';
import AntTable from 'components/AntTable/AntTable';
import { ColumnType } from 'antd/lib/table';
import { CompaniesType } from 'services/models/Companies';
import { useTranslation } from 'react-i18next';
import { Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { ParamsSettings } from 'services/models/Response';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import env from 'env';

interface Props {
  dataSource?: CompaniesType[];
  isLoading?: boolean;
  pagination?: {
    totalRows?: number;
  };
  onFilter?: (params: ParamsSettings<CompaniesType>) => void;
  onRefresh?: () => void;
  sortOrder?: 'ascend' | 'descend';
}
export default function TableCompanies({ dataSource, isLoading, pagination, onFilter }: Props) {
  const { t } = useTranslation(['companies', 'translation']);
  const [currentPage, setCurrentPage] = useState(0);

  const theme = useTheme();
  const columns: ColumnType<CompaniesType>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: () => t('name'),
      render: (value: string) => (
        <Typography fontWeight={700} variant="body2">
          {value}
        </Typography>
      ),
      width: 200,
    },
    {
      key: 'domain',
      dataIndex: 'domain',
      title: () => t('domain'),
      render: (value: string) => (
        <Box>
          <Stack spacing="4px" direction="row" alignItems="center">
            <Typography variant="body2" fontWeight={700}>
              {t('cms')}:
            </Typography>
            <Typography fontSize={14} fontWeight={700} color={theme.palette.primary.main}>
              {`${value}.${env.baseCmsDomain}`}
            </Typography>
          </Stack>
          <Stack spacing="4px" direction="row" alignItems="center">
            <Typography variant="body2" fontWeight={700}>
              {t('web')}:
            </Typography>
            <Typography fontSize={14} fontWeight={700} color={theme.palette.primary.main}>
              {`${value}.${env.baseWebDomain}`}
            </Typography>
          </Stack>
        </Box>
      ),
      sorter: () => 0,
      width: 200,
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: () => t('email'),
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
      width: 250,
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: () => t('address'),
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
      width: 350,
    },
    {
      key: 'city',
      dataIndex: 'city',
      title: () => t('city'),
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
      width: 200,
    },
    {
      key: 'remaining_days',
      dataIndex: 'remaining_days',
      title: () => t('remaining_days'),
      align: 'center',
      render: (_, record) => {
        const endDate = dayjs(record.subscription?.endDate);
        const now = dayjs();
        const remainingDays = endDate.diff(now, 'day') < 0 ? 0 : endDate.diff(now, 'day');
        return <Typography variant="body2">{remainingDays}</Typography>;
      },
      width: 150,
    },
  ];
  return (
    <div>
      <AntTable
        columns={columns}
        dataSource={dataSource}
        rowKey={r => `${r.id}`}
        loading={isLoading}
        pagination={{
          pageSize: 10,
          total: pagination?.totalRows,
          current: currentPage + 1,
        }}
        onChange={(pagination, _, sorter, extra) => {
          setCurrentPage(getPaginationFromAntdTable({ pagination, extra }));
          onFilter?.({ page: getPaginationFromAntdTable({ pagination, extra }), sorter: getSorterParamsFromAntdTable({ sorter }), searcher: {} });
        }}
      />
    </div>
  );
}
