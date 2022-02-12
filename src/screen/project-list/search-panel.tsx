/* @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import React from 'react'
import { Select, Input, Form } from 'antd'
import { Project } from './list'
import IdSelect from 'component/IdSelect'
export interface User {
  id: number
  name: string
  token: string
}
interface SearchPanelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
  users: User[]
}

const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  console.log(param, 'param')
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
        <IdSelect
          value={param.personId}
          onChange={(value) => {
            setParam({ ...param, personId: value })
          }}
          option={users}
          defaultOptionName="负责人"
        ></IdSelect>
      </Form.Item>
    </Form>
  )
}
export default SearchPanel
