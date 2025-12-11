import type { HTMLAttributes, ReactNode } from 'react'

export type PanelActionVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

export interface PanelActionProps extends HTMLAttributes<HTMLDivElement> {
  /** Variante visual del panel */
  variant?: PanelActionVariant
  /** Título del panel */
  title?: string
  /** Descripción o contenido secundario */
  description?: ReactNode
  /** Icono del panel */
  icon?: ReactNode
  /** Acciones del panel (botones, links, etc.) */
  actions?: ReactNode
  /** Si el panel puede cerrarse */
  dismissible?: boolean
  /** Callback al cerrar */
  onDismiss?: () => void
  /** Contenido principal */
  children?: ReactNode
}

const variantStyles: Record<PanelActionVariant, string> = {
  default: 'panel-action-default',
  info: 'panel-action-info',
  success: 'panel-action-success',
  warning: 'panel-action-warning',
  error: 'panel-action-error',
}

/**
 * Componente PanelAction para mensajes con acciones contextuales
 * 
 * @example
 * ```tsx
 * <PanelAction
 *   variant="info"
 *   title="Nueva actualización disponible"
 *   description="Versión 2.0 lista para instalar"
 *   actions={<Button size="sm">Actualizar</Button>}
 * />
 * 
 * <PanelAction
 *   variant="warning"
 *   icon={<Icon name="settings" />}
 *   dismissible
 *   onDismiss={() => console.log('dismissed')}
 * >
 *   Configuración incompleta
 * </PanelAction>
 * ```
 */
export function PanelAction({
  variant = 'default',
  title,
  description,
  icon,
  actions,
  dismissible = false,
  onDismiss,
  children,
  className = '',
  ...props
}: PanelActionProps) {
  const classes = [
    'panel-action',
    variantStyles[variant],
    className,
  ].filter(Boolean).join(' ')

  const roleMap: Record<PanelActionVariant, string> = {
    default: 'region',
    info: 'status',
    success: 'status',
    warning: 'alert',
    error: 'alert',
  }

  return (
    <div className={classes} role={roleMap[variant]} {...props}>
      {icon && <div className="panel-action-icon">{icon}</div>}
      
      <div className="panel-action-content">
        {title && <div className="panel-action-title">{title}</div>}
        {description && <div className="panel-action-description">{description}</div>}
        {children && <div className="panel-action-body">{children}</div>}
      </div>

      {actions && <div className="panel-action-actions">{actions}</div>}

      {dismissible && (
        <button
          type="button"
          className="panel-action-dismiss"
          onClick={onDismiss}
          aria-label="Cerrar"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default PanelAction
