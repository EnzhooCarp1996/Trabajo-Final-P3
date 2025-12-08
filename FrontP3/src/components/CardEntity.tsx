import { Card, Typography } from 'antd'
import type { CSSProperties, ReactNode } from 'react'

const { Text } = Typography

interface CardEntityProps {
  title?: string
  icon?: ReactNode
  children?: ReactNode
  borderColor?: string
  backgroundColor?: string
  styles?: CSSProperties
}

export const CardEntity: React.FC<CardEntityProps> = ({
  title,
  icon,
  children,
  borderColor = 'rgba(255,255,255,0.15)',
  backgroundColor = 'rgba(255,255,255,0.1)',
  styles,
}) => {
  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
            {icon}
            {title}
          </span>
        </div>
      }
      style={{
        background: backgroundColor,
        color: 'white',
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        ...styles,
      }}
    >
      <Text style={{ color: '#ccc' }}>{children}</Text>
    </Card>
  )
}
