import { Route, Router, Routes } from 'react-router-dom'
import './index.css'
import SignIn from './pages/SignIn'
import Tasks from './pages/Tasks'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>

    </>
  )
}

export default App
