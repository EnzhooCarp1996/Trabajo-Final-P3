import { useEffect, useState, type FC } from 'react'
import { proposalService } from '../../services/ProposalService'
import { Spin, Timeline } from 'antd'
import type { IProposal } from '../../types/types'

interface ProposalsToModalProps {
  _id: string
  onCountChange?: (count: number) => void
}

export const ProposalsToModal: FC<ProposalsToModalProps> = ({ _id, onCountChange }) => {
  const [proposals, setProposals] = useState<IProposal[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!_id) return

    const fetchProposals = async () => {
      setLoading(true)
      try {
        const result = await proposalService.getAll({ emprendedorId: _id })
        setProposals(result)
        onCountChange?.(result.length)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [_id])

  if (loading) return <Spin />

  if (proposals.length === 0) return <p>No tiene propuestas.</p>

  return (
    <Timeline
      items={proposals.map((p) => ({
        color: 'blue',
        children: (
          <span>
            <b>{p.tituloPropuesta}</b> — {p.estado}
          </span>
        ),
      }))}
    />
  )
}
