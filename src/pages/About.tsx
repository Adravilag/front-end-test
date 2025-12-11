import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="page">
      <h1>About</h1>
      <p>Acerca de nosotros</p>
      <Link to="/">Volver al Home</Link>
    </div>
  )
}
