import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to="/">Volver al Home</Link>
    </div>
  )
}
