import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import UserBracket from './pages/UserBracket.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/u/:id" element={<UserBracket />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Nav />
    </>
  )
}
