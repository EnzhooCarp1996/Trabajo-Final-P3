import { ProposalTableColumns } from '../../Proposal/ProposalTableColumns'
import { EntrepreneurModal } from '../../Entrepreneur/EntrepreneurModal'
import type { IEntrepreneurRef, IProposal } from '../../../types/types'
import { proposalService } from '../../../services/ProposalService'
import { message, Table, Typography } from 'antd'
import { BackHeader } from '../../BackHeader'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const { Title } = Typography

export const ProposalsByChallenge = () => {
  const { id } = useParams()
  const [proposals, setProposals] = useState<IProposal[]>([])
  const [loading, setLoading] = useState(false)
  const [openEntrepreneur, setOpenEntrepreneur] = useState(false)
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState<IEntrepreneurRef | null>(null)
  const [challengeTitle, setChallengeTitle] = useState('')

  const openEntrepreneurModal = (entrepreneur: IEntrepreneurRef) => {
    setSelectedEntrepreneur(entrepreneur)
    setOpenEntrepreneur(true)
  }

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true)
      try {
        const data = await proposalService.getAll({ desafioId: id })
        setProposals(data)
        if (data.length > 0) {
          setChallengeTitle(data[0].desafioId?.titulo ?? '')
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

  const columns = ProposalTableColumns({
    showSelectEstado: false,
    showEmprendedor: true,
    openEmprendedor: openEntrepreneurModal,
  })

  return (
    <>
      <BackHeader />
      <div style={{ width: 'auto', margin: '0 auto', minHeight: 400 }}>
        <Title level={3} style={{ color: '#8c8c8c', marginBottom: 12 }}>
          Propuestas de: {challengeTitle}
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
            scroll={{ x: 700, y: 400 }}
          />
        )}
        {/* Modal con los datos del emprendedor */}
        {selectedEntrepreneur && (
          <EntrepreneurModal
            open={openEntrepreneur}
            onClose={() => setOpenEntrepreneur(false)}
            _id={selectedEntrepreneur?._id}
          />
        )}
      </div>
    </>
  )
}
