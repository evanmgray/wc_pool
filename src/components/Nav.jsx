import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end>
        Leaderboard
      </NavLink>
      <NavLink to="/admin">Admin</NavLink>
    </nav>
  )
}
