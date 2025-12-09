import { GlobalOutlined, PhoneOutlined } from '@ant-design/icons'
import { userService } from '../../services/UserService'
import { CompanyChallenges } from './CompanyChallenges'
import type { IUser } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { message, Modal } from 'antd'

interface CompanyModalProps {
  open: boolean
  onClose: () => void
  _id: string
}

export const CompanyModal = ({ _id, open, onClose }: CompanyModalProps) => {
  const navigate = useNavigate()
  const [company, setCompany] = useState<IUser>()
  const [challengeCount, setChallengeCount] = useState(0)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await userService.getById(_id)
        setCompany(data)
      } catch (error) {
        console.error(error)
        message.error('Error al cargar tus desafios')
      }
    }

    fetchChallenges()
  }, [_id])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closeIcon={<span style={{ color: 'red', fontSize: 20 }}>✕</span>}
      styles={{
        header: { background: '#0b1a2e', color: 'white', borderBottom: '1px solid #1677ff' },
        body: { background: '#0d1117', color: 'white', padding: '24px' },
        content: {
          background: '#0d1117',
          borderRadius: '12px',
          border: '1px solid #1677ff',
          boxShadow: '0 0 12px rgba(22, 119, 255, 0.4)',
        },
      }}
    >
      {company && (
        <>
          <h2 style={{ color: '#69b1ff' }}>{company.nombreEmpresa}</h2>
          <p style={{ color: '#c9d1d9' }}>{company.descripcion}</p>
          <p style={{ color: '#69b1ff', marginTop: 12 }}>
            <GlobalOutlined />{' '}
            <a href={company.sitioWeb} target="_blank" rel="noopener noreferrer" style={{ color: '#69b1ff' }}>
              {company.sitioWeb}
            </a>
          </p>
          <p style={{ color: '#69b1ff' }}>
            {' '}
            <PhoneOutlined /> {company.telefono}
          </p>
          <h3
            style={{
                color: challengeCount > 0 ? '#69b1ff' : '#999',
                textDecoration: challengeCount > 0 ? 'underline' : 'none',
                cursor: challengeCount > 0 ? 'pointer' : 'not-allowed',
              }}
            onClick={() => {
              if (challengeCount === 0) return
              navigate(`/ChallengesByCompany/${_id}`)
              }}
          >
            Ver Sus Desafíos
          </h3>

          <CompanyChallenges empresaId={company._id} onCountChange={setChallengeCount}/>
        </>
      )}
    </Modal>
  )
}
