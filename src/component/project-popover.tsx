import React, { useMemo } from 'react'
import { List, Typography, Popover, Divider } from 'antd'
import { useProject } from '../utils/useProject'
import { ButtonNopadding } from './lib'
import styled from '@emotion/styled'
import { useCallback } from 'react'

const ProjectPopover = () => {
  // 列表
  const { data } = useProject({})

  const pinnedProject = useMemo(() => {
    return data?.filter((item) => item.pin)
  }, [])
  // const pinnedProject = data?.filter((item) => item.pin)
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProject?.map((project) => (
          <List.Item key={project.id}>{project.name}</List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNopadding type="link">创建项目</ButtonNopadding>
    </ContentContainer>
  )
  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`

export default ProjectPopover
