/* @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React from 'react'
import { Select, Input, Form } from 'antd'
export interface User {
  id: number
  name: string
  token: string
}
interface SearchPanelProps {
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
  users: User[]
}

const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form layout={'inline'} css={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          placeholder="项目名"
          value={param.name}
          onChange={(e) => {
            setParam({ ...param, name: e.target.value })
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => {
            setParam({ ...param, personId: value })
          }}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id}>{user.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
export default SearchPanel
