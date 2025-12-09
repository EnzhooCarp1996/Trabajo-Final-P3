import { voteService } from '../../services/VoteService'
import { Modal, Rate, Button, message } from 'antd'
import { useEffect, useState } from 'react'

interface Props {
  propuestaId: string
  open: boolean
  onClose: () => void
  onVoted?: () => void
}

export default function VoteProposalModal({ propuestaId, open, onClose, onVoted }: Props) {
  const [valor, setValor] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      voteService.getVoteProposalByCompany(propuestaId).then((res) => setValor(res.valor ?? 0))
    }
  }, [open, propuestaId])

  const handleVotar = async () => {
    if (valor === 0) {
      message.warning('Seleccioná una puntuación')
      return
    }

    try {
      setLoading(true)
      await voteService.votarPropuesta(propuestaId, { valor })
      message.success('Voto enviado')
      onVoted?.()
      onClose()
    } catch (err) {
      console.error('Error al votar:', err)
      message.error('Error al votar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={<span style={{ color: 'white', fontSize: 20 }}>Calificar propuesta</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
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
      <div style={{ textAlign: 'center', padding: 20 }}>
        <Rate value={valor} onChange={setValor} />
        <style>
          {`
                        .ant-rate-star-zero .ant-rate-star-second,
                        .ant-rate-star-zero .ant-rate-star-first {
                        color: rgba(255, 255, 255, 0.7);
                        }

                        .ant-rate-star-full .ant-rate-star-second,
                        .ant-rate-star-full .ant-rate-star-first {
                        color: #fadb14;
                        }
                    `}
        </style>
        <div style={{ color: '#aaa', marginTop: 8 }}>{valor === 0 ? 'Sin votar' : `${valor} de 5`}</div>

        <div style={{ marginTop: 24 }}>
          <Button
            type="primary"
            onClick={handleVotar}
            loading={loading}
            style={{
              background: '#1677ff',
              borderColor: '#1677ff',
              color: 'white',
            }}
            disabled={valor === 0}
          >
            Votar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
