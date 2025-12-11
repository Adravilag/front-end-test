import { useEffect } from 'react'
import { Icon, type IconName } from '../Icon/Icon'
import './Toast.css'

interface ToastProps {
  message: string
  title?: string
  onDismiss: () => void
  duration?: number
  type?: 'info' | 'warning' | 'error' | 'success'
  showProgress?: boolean
}

const typeConfig: Record<string, { icon: IconName; title: string }> = {
  info: { icon: 'info', title: 'Información' },
  warning: { icon: 'alert', title: 'Advertencia' },
  error: { icon: 'error', title: 'Error' },
  success: { icon: 'check', title: 'Éxito' }
}

export function Toast({ 
  message, 
  title,
  onDismiss, 
  duration = 5000, 
  type = 'info',
  showProgress = true
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  const config = typeConfig[type]
  const displayTitle = title || config.title

  return (
    <div 
      className={`toast toast--${type}`} 
      role="alert"
      style={{ '--toast-duration': `${duration}ms` } as React.CSSProperties}
    >
      <div className="toast__icon-wrapper">
        <Icon name={config.icon} className="toast__icon" />
      </div>
      <div className="toast__content">
        <div className="toast__title">{displayTitle}</div>
        <div className="toast__message">{message}</div>
      </div>
      <button 
        className="toast__close" 
        onClick={onDismiss}
        aria-label="Cerrar notificación"
      >
        <Icon name="close" />
      </button>
      {showProgress && <div className="toast__progress" />}
    </div>
  )
}
