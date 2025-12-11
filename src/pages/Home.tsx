import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page">
      <h1>Home</h1>
      <p>Página principal</p>
      <Link to="/about">Ir a About</Link>
    </div>
  )
}
