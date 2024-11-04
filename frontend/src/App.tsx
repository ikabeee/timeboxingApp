import { Route, Routes } from 'react-router-dom'
import { FooterTime } from './layouts/FooterTime'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import './index.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
      <FooterTime />
    </>
  )
}

export default App
