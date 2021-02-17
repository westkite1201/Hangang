import DashBoard from '../../components/DashBoard/DashBoardMain';
import { useMemo } from 'react';
import faker from 'faker/locale/ko';
import ReactTable from '../../components/common/ReactTable';

faker.seed(100);
const MemberManage = ({ themeMode }) => {
  const columns = useMemo(
    () => [
      {
        accessor: 'name',
        Header: 'Name'
      },
      {
        accessor: 'email',
        Header: 'Email'
      },
      {
        accessor: 'status',
        Header: 'Status'
      },
      {
        accessor: 'phone',
        Header: 'Phone'
      }
    ],
    []
  );
  const data = useMemo(
    () =>
      Array(53)
        .fill(0)
        .map(() => ({
          name: faker.name.lastName() + faker.name.firstName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          status: faker.random.boolean()
        })),
    []
  );
  return (
    <DashBoard themeMode={themeMode}>
      <ReactTable columns={columns} data={data} />
    </DashBoard>
  );
};

export default MemberManage;
