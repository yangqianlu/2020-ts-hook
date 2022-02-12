import React from 'react'
import { Button, Drawer } from 'antd'
const ProjectModel = ({
  projectModelOpen,
  onClose,
}: {
  projectModelOpen: boolean
  onClose: () => void
}) => {
  return (
    <Drawer width={'100%'} visible={projectModelOpen} onClose={onClose}>
      <Button onClick={onClose}>确认</Button>
    </Drawer>
  )
}
export default ProjectModel
