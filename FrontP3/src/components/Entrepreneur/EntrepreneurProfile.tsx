import { ProposalsToModal } from '../Proposal/ProposalsToModal'
import { BulbOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Card, Divider, Typography } from 'antd'
import { useAuth } from '../../context/Auth/useAuth'
import { EnviarMensaje } from './EnviarMensaje'
import type { IUser } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const { Title } = Typography

interface EntrepreneurProfileProps {
  user: IUser | null
  showbutton?: boolean
}

export const EntrepreneurProfile: React.FC<EntrepreneurProfileProps> = ({ user, showbutton = false }) => {
  const navigate = useNavigate()
  const { role } = useAuth()
  const [proposalCount, setProposalCount] = useState(0)

  if (!user) return <p>Cargando...</p>

  return (
    <>
      {/* Foto + header */}
      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', alignItems: 'center', marginTop: -60 }}>
        <Avatar size={120} icon={<UserOutlined />} style={{ border: '4px solid white', background: '#1677ff' }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column', // apilar verticalmente en móviles
            gap: '4px', // separación entre líneas
            minWidth: 0, // para evitar overflow
            maxWidth: '100%', // que nunca se pase del ancho de la pantalla
          }}
        >
          <h1 style={{ fontSize: '1.2rem', margin: 0, overflowWrap: 'break-word' }}>{user.nombreCompleto}</h1>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#ddd', overflowWrap: 'break-word' }}>{user.email}</p>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#ddd' }}>{user.edad} años</p>
        </div>

        {role === 'empresa' && showbutton && <EnviarMensaje emprendendedorId={user._id} />}
      </div>

      {/* Info */}
      <p style={{ marginTop: 30 }}>{user.descripcion}</p>

      {/* Propuestas */}
      <Card
        style={{
          marginTop: 24,
          borderRadius: 16,
          padding: 16,
          background: '#1677ff',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
        styles={{ body: { padding: 0 } }}
      >
        <div style={{ padding: '16px 20px 0 20px' }}>
          <Title level={4} style={{ color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <BulbOutlined />
            <strong
              style={{
                color: proposalCount > 0 ? '#69b1ff' : '#999',
                textDecoration: proposalCount > 0 ? 'underline' : 'none',
                cursor: proposalCount > 0 ? 'pointer' : 'not-allowed',
              }}
              onClick={() => {
                if (proposalCount === 0) return
                navigate(`/proposals/entrepreneur/${user._id}`)
              }}
            >
              Sus Propuestas
            </strong>
          </Title>
        </div>

        <Divider style={{ borderColor: 'rgba(255,255,255,0.15)', margin: '12px 0' }} />

        <div style={{ padding: '0 20px 16px 20px' }}>
          <ProposalsToModal _id={user._id} onCountChange={setProposalCount} />
        </div>
      </Card>
    </>
  )
}
