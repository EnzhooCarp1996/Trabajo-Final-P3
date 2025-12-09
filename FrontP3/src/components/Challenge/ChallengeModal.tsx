import { ProposalsToModalChallenge } from './ProposalsToModalChallenge'
import { challengeService } from '../../services/ChallengeService'
import type { IChallenge } from '../../types/types'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { message, Modal } from 'antd'

interface ChallengeModalProps {
  _id: string
  open: boolean
  onClose: () => void
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({ _id, open, onClose }) => {
  const [challenge, setChallenge] = useState<IChallenge>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await challengeService.getById(_id)
        setChallenge(data)
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
      {challenge && (
        <>
          <h2 style={{ color: '#69b1ff' }}>{challenge.titulo}</h2>
          <p style={{ color: '#c9d1d9' }}>{challenge.descripcion}</p>
          <p style={{ color: '#c9d1d9' }}>Propuesto por: {challenge.empresaId.nombreEmpresa}</p>
          <h3
            style={{ color: '#69b1ff', marginTop: 20, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate(`/proposals/challenge/${_id}`)}
          >
            Sus Propuestas
          </h3>
          <ProposalsToModalChallenge _id={challenge._id} />
        </>
      )}
    </Modal>
  )
}
