import { ArrowLeftOutlined } from '@ant-design/icons'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface BackHeaderProps {
  children?: ReactNode
}

export const BackHeader: React.FC<BackHeaderProps> = ({ children }) => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 5 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 0,
          gap: 12,
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
        }}
      >
        <div onClick={() => navigate(-1)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeftOutlined style={{ fontSize: 18, color: 'white' }} />
          <span style={{ color: 'white' }}>Volver</span>
        </div>
      </div>
      {children}
    </div>
  )
}
