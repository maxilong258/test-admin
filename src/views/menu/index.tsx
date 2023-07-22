import { Button, Table } from 'antd'

export const MenuManager = () => {
  const TableData = [
    {
      menuname: 'dashboard',
      route: '/dashboard',
      sort: '1',
      crud: 'READ,UPDATE'
    }
  ]

  const columns = [
    { title: 'Menu Name', dataIndex: 'menuname', key: 'menuname' },
    { title: 'Route', dataIndex: 'route', key: 'route' },
    { title: 'Sort', dataIndex: 'sort', key: 'sort' },
    { title: 'CRUD', dataIndex: 'crud', key: 'crud' },
    {
      title: 'operate',
      key: 'operate',
      render: () => (
        <>
          <Button>Modify</Button>
          <Button>Delete</Button>
        </>
      )
    }
  ]

  return (
    <>
      <Table loading={false} columns={columns} dataSource={TableData}></Table>
    </>
  )
}
