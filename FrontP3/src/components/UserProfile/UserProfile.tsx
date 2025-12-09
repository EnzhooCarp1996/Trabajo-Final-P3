import { BankOutlined, EditOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { userService } from '../../services/UserService'
import { useAuth } from '../../context/Auth/useAuth'
import { Card, Typography, Button } from 'antd'
import type { IUser } from '../../types/types'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

const { Title, Text } = Typography

export const UserProfile = () => {
  const { _id, role } = useAuth()
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)

  useEffect(() => {
    if (!_id) return

    userService
      .getById(_id)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error('Error cargando usuario:', err))
  }, [_id])

  return (
    <>
      <div style={{ minHeight: '200px', overflowY: 'auto' }}>
        <div
          style={{
            backgroundColor: '#0a1f44',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '650px',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          {/*Información Básica del Usuario */}
          <Card
            style={{ borderColor: '#089717ff', marginBottom: '20px', backgroundColor: '#002140', color: '#fff' }}
            title={
              <div
                style={{ color: '#089717ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div>
                  <Title style={{ color: '#ccc' }} level={3}>
                    {role === 'emprendedor' ? (
                      <>
                        <UserOutlined style={{ marginRight: '20px', fontSize: '2em' }} />
                        {currentUser?.nombreCompleto}
                      </>
                    ) : (
                      <>
                        <BankOutlined style={{ marginRight: '20px', fontSize: '3em' }} />
                        {currentUser?.nombreEmpresa}
                      </>
                    )}
                  </Title>
                </div>
                <div>
                  <Title
                    level={3}
                    style={{ textAlign: 'center', color: 'white', cursor: 'pointer', transition: '0.2s' }}
                  >
                    <Link
                      to={role === 'emprendedor' ? '/ProposalById' : '/ChallengeById'}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                    >
                      Mis {role === 'emprendedor' ? 'Propuestas' : 'Desafíos'}
                    </Link>
                  </Title>
                </div>
              </div>
            }
            actions={[
              <Link to="/ProfileEdit">
                <Button
                  icon={<EditOutlined />}
                  style={{
                    backgroundColor: '#1677ff',
                    color: 'white',
                    borderRadius: 8,
                    padding: '4px 12px',
                    border: 'none',
                  }}
                >
                  Editar Perfil
                </Button>
              </Link>,
            ]}
          >
            <div style={{ marginBottom: '12px' }}>
              <Text style={{ color: '#ccc' }}>
                Fecha de Registro: {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : ''}
              </Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text style={{ color: '#ccc' }}>Telefono: {currentUser?.telefono}</Text>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <Text style={{ color: '#ccc' }}>
                Email <MailOutlined />: {currentUser?.email}
              </Text>
            </div>

            {role === 'emprendedor' ? (
              <div style={{ marginBottom: '12px' }}>
                <Text style={{ color: '#ccc' }}>Edad: {currentUser?.edad}</Text>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <Text style={{ color: '#fff' }}>
                    Sitio Web:{' '}
                    <a href={currentUser?.sitioWeb} target="_blank" style={{ color: '#91caff' }}>
                      {currentUser?.sitioWeb}
                    </a>
                  </Text>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <Text style={{ color: '#fff' }}>Descripción: {currentUser?.descripcion}</Text>
                </div>
              </>
            )}
            <div style={{ marginBottom: '12px' }}>
              <Text style={{ color: '#ccc' }}>Estado: {currentUser?.activo ? 'Activo' : 'Inactivo'}</Text>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
