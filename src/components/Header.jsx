export default function Header({ subtitle }) {
  return (
    <header className="app-header">
      <span className="logo">World Cup</span>
      <h1>Bracket Pool</h1>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </header>
  )
}
