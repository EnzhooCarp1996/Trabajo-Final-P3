import type { IProposal } from '../../../types/types'
import { FileTextOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Tag } from 'antd'

interface ProposalStatisticsProps {
  proposals: IProposal[]
}

export const ProposalStatistics: React.FC<ProposalStatisticsProps> = ({ proposals }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 600px)')
    setIsMobile(media.matches)
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const pendingProposals = proposals.filter((p) => p.estado === 'en revision').length
  const approvedProposals = proposals.filter((p) => p.estado === 'seleccionada').length
  const rejectedProposals = proposals.filter((p) => p.estado === 'descartada').length
  const totalProposals = proposals.length

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        flexDirection: isMobile ? 'column' : 'row',
        flexWrap: 'wrap',
        gap: 12,
        width: '100%',
      }}
    >
      {/* IZQUIERDA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}
      >
        <FileTextOutlined
          style={{ fontSize: 24, color: 'white', padding: 8, backgroundColor: '#efb810', borderRadius: 8 }}
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: isMobile ? 'center' : 'flex-start',
            borderRadius: 12,
          }}
        >
          <Tag style={{ borderRadius: 12, backgroundColor: '#1677ff' }} color="white">
            Revisión: {pendingProposals}
          </Tag>
          <Tag style={{ borderRadius: 12, backgroundColor: 'green' }} color="white">
            Seleccionados: {approvedProposals}
          </Tag>
          <Tag style={{ borderRadius: 12, backgroundColor: 'red' }} color="white">
            Descartados: {rejectedProposals}
          </Tag>
          <Tag style={{ borderRadius: 12, backgroundColor: 'grey' }} color="white">
            Total: {totalProposals}
          </Tag>
        </div>
      </div>
    </div>
  )
}
