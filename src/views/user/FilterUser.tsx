import { cleanObject } from '@/utils'
import { Button, Drawer, Form, Input, Radio, Space } from 'antd'
import { useState } from 'react'

export const FilterUser = ({
  refetch
}: {
  refetch: (queryParams?: object) => Promise<any>
}) => {
  const [isShowFilterDrawer, setIsShowFilterDrawer] = useState(false)
  const [hasQuery, setHasQuery] = useState(false)
  const [filterQuery, setFilterQuery] = useState({
    username: '',
    role: null,
    gender: null
  })

  const checkFilterList = () => {
    const queryParams = cleanObject(filterQuery)
    Object.keys(queryParams).length === 0
      ? setHasQuery(false)
      : setHasQuery(true)
    refetch(queryParams).then(() => setIsShowFilterDrawer(false))
  }

  return (
    <>
      <Button danger={hasQuery} onClick={() => setIsShowFilterDrawer(true)}>
        Filter
      </Button>

      <Drawer
        width={600}
        title={'Filter Query'}
        onClose={() => setIsShowFilterDrawer(false)}
        open={isShowFilterDrawer}
        destroyOnClose={true}
        footer={
          <Space style={{ float: 'right' }}>
            <Button onClick={() => checkFilterList()}>Ok</Button>
          </Space>
        }
      >
        <Form initialValues={filterQuery}>
          <Form.Item label="Name" name={'username'}>
            <Input
              type={'text'}
              onChange={(e) => {
                setFilterQuery({ ...filterQuery, username: e.target.value })
              }}
            />
          </Form.Item>
          <Form.Item label="Roles" name={'role'}>
            <Radio.Group
              onChange={(e) => {
                setFilterQuery({ ...filterQuery, role: e.target.value })
              }}
            >
              <Radio value={null}>All</Radio>
              <Radio value={1}>管理员</Radio>
              <Radio value={2}>普通用户</Radio>
              <Radio value={3}>测试用户</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Gender" name={'gender'}>
            <Radio.Group
              onChange={(e) => {
                setFilterQuery({ ...filterQuery, gender: e.target.value })
              }}
            >
              <Radio value={null}>All</Radio>
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
