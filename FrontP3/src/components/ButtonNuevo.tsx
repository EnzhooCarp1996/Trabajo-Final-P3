import type { ReactNode } from 'react'
import { Button } from 'antd'

interface ButtonNuevoProps {
  title?: string
  onClick?: () => void
  style?: React.CSSProperties
  icon?: ReactNode
}

export const ButtonNuevo: React.FC<ButtonNuevoProps> = ({ title = 'Nuevo', onClick, style, icon }) => {
  return (
    <Button
      type="primary"
      icon={icon}
      onClick={onClick}
      style={{
        backgroundColor: '#1677ff',
        borderRadius: 8,
        height: 32,
        fontSize: 12,
        padding: '0 8px',
        ...style,
      }}
    >
      {title}
    </Button>
  )
}
