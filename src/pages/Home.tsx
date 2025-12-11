import { Link } from 'react-router-dom'
import { Icon, ICON_NAMES } from '../ui'

export default function Home() {
  return (
    <div className="page">
      <h1>
        <Icon name="home" size={32} />
        Home
      </h1>
      <p>Página principal</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Iconos disponibles</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {ICON_NAMES.map((iconName) => (
            <div 
              key={iconName} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                minWidth: '80px'
              }}
            >
              <Icon name={iconName} size={24} />
              <span style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{iconName}</span>
            </div>
          ))}
        </div>
      </section>
      
      <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
        Ir a About
        <Icon name="arrow-right" size={16} />
      </Link>
    </div>
  )
}
