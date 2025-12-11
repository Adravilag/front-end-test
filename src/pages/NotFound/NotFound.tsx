import { Link } from 'react-router-dom'
import { Button, Icon } from '../../ui'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found">
      <Icon name="search" size={600} className="not-found-bg-icon" />
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Página no encontrada</h2>
        <p className="not-found-description">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button
            variant="primary"
            size="lg"
            icon={<Icon name="home" size={20} className="btn-icon-home" />}
          >
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
