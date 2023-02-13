import { useMediaQuery } from '@mui/material';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import 'antd/lib/table/style/css';
import './styles.scss';

export default function AntTable<T extends object = any>({ ...props }: TableProps<T>) {
  const matches = useMediaQuery('(min-width:1366px)');
  return (
    <div className="tbus-table">
      <Table {...props} scroll={{ y: '100vh', x: matches ? undefined : 1300 }} />
    </div>
  );
}
