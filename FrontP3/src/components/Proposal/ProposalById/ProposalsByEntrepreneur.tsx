import type { IChallengeRef, IProposal } from '../../../types/types'
import { proposalService } from '../../../services/ProposalService'
import { ChallengeModal } from '../../Challenge/ChallengeModal'
import { ProposalTableColumns } from '../ProposalTableColumns'
import { message, Table, Typography } from 'antd'
import { BackHeader } from '../../BackHeader'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const { Title } = Typography

export const ProposalsByEntrepreneur = () => {
  const { id } = useParams()
  const [proposals, setProposals] = useState<IProposal[]>([])
  const [loading, setLoading] = useState(false)
  const [openChallenge, setOpenChallenge] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<IChallengeRef | null>(null)
  const [entrepreneurName, setEntrepreneurName] = useState('')

  const openChallengeModal = (challenge: IChallengeRef) => {
    setSelectedChallenge(challenge)
    setOpenChallenge(true)
  }

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true)
      try {
        const data = await proposalService.getAll({ emprendedorId: id })
        setProposals(data)
        if (data.length > 0) {
          setEntrepreneurName(data[0].emprendedorId?.nombreCompleto ?? '')
        }
      } catch (error) {
        console.error('Error al cargar las propuestas: ', error)
        message.error('Error al cargar las propuestas')
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [id])

  const columns = ProposalTableColumns<IProposal>({
    openChallengeModal: openChallengeModal,
  })

  return (
    <>
      <BackHeader />

      <div style={{ width: 'auto', margin: '0 auto', minHeight: 400 }}>
        <Title level={3} style={{ color: '#8c8c8c', marginBottom: 12, marginTop: 0 }}>
          Propuestas de: {entrepreneurName}
        </Title>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Table
            rowKey="_id"
            columns={columns.map((col) => ({
              ...col,
              onHeaderCell: () => ({ style: { backgroundColor: '#001529', color: 'white', fontWeight: 'bold' } }),
            }))}
            dataSource={proposals}
          />
        )}

        {selectedChallenge && (
          <ChallengeModal open={openChallenge} onClose={() => setOpenChallenge(false)} _id={selectedChallenge._id} />
        )}
      </div>
    </>
  )
}
