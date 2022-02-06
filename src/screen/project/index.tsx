import React from 'react'
import { Navigate, Routes, Route } from 'react-router'
import {Link } from 'react-router-dom'
import KanBan from 'screen/kanan'
import Epic from 'screen/epic'
const ProjectScreen = () => {
  return (
    <div>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务</Link>
      <Routes>
        <Route path="/kanban" element={<KanBan />} />
        <Route path="/epic" element={<Epic />} />
      </Routes>
    </div>
  )
}
export default ProjectScreen
