import React from 'react'
import { User } from './search-panel'
import { Table } from 'antd'
import { TableProps } from 'antd/es/table'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
export interface Project {
  name: string
  personId: string
  organization: string
  created: number
}
interface ListProps extends TableProps<Project> {
  users: User[]
}
const List = ({ users, ...props }: ListProps) => {
  const columns = [
    {
      title: '名称',
      key: 'name',
      render(value: any, project: any) {
        return <Link to={String(project.id)}>{project.name}</Link>
      },
    },
    {
      title: '部门',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: '负责人',
      render(value: any, project: any) {
        return (
          <span>
            {users.find((user) => user.id === project.personId)?.name}
          </span>
        )
      },
    },
    {
      title: '创建时间',
      render(value: any, project: any) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format('YYYY-MM-DD')
              : '无'}
          </span>
        )
      },
    },
  ]
  return <Table pagination={false} columns={columns} {...props} />
}
export default List
