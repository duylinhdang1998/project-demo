import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import 'antd/lib/table/style/css';
import './styles.scss';

export default function AntTable<T extends object = any>({ ...props }: TableProps<T>) {
  return (
    <div className="tbus-table">
      <Table scroll={{ x: 1200 }} {...props} />
    </div>
  );
}
