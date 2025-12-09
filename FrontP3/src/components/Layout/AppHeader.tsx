import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Layout, Typography, Button, Space, Avatar } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserDropdownCard } from './UserDropdownCard'
import { NotificationBell } from './NotificationBell'
import { useAuth } from '../../context/Auth/useAuth'
import { useEffect, useRef, useState } from 'react'

const { Header } = Layout
const { Title } = Typography

interface AppHeaderProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const pageTitles: Record<string, string> = {
  '/UserProfile': 'Perfil',
  '/Company': 'Empresas',
  '/Entrepreneur': 'Emprendedores',
  '/Proposal': 'Propuestas',
  '/Challenge': 'Desafíos',
  '/ChallengesByEntrepreneur': 'Desafíos',
  '/ChallengeById': 'Mis Desafíos',
  '/ProposalById': 'Mis Propuestas',
}

export const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { nombre, role, email, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const title = pageTitles[location.pathname] || 'Plataforma de Desafíos'

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClick = () => {
    navigate('/UserProfile')
  }
  return (
    <Header
      style={{
        backgroundColor: '#002140',
        color: 'white',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '18px',
          color: 'white',
          width: 48,
          height: 48,
        }}
      />

      <Title level={4} style={{ color: 'white', margin: 0 }}>
        {title}
      </Title>

      <Space size="middle">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <NotificationBell />
          <div ref={wrapperRef} style={{ position: 'relative' }}>
            <Avatar size={48} style={{ cursor: 'pointer', backgroundColor: '#1890ff' }} onClick={() => setOpen(!open)}>
              {nombre || 'U'}
            </Avatar>

            {open && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 60,
                  zIndex: 9999,
                }}
              >
                <UserDropdownCard nombre={nombre} role={role} email={email} onProfile={handleClick} onLogout={logout} />
              </div>
            )}
          </div>
        </div>
      </Space>
    </Header>
  )
}
