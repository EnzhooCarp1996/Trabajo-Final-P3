import { useProposal } from '../../hooks/Proposal/useProposal'
import { estadoPropuestas } from '../../utils/utilsProposals'
import type { ProposalStatus } from '../../types/types'
import { TabsProposals } from '../TabsProposals'
import { ProposalsList } from './ProposalsList'
import { GridRow } from '../GridRow'
import 'swiper/css/navigation'
import 'swiper/css'

export const ProposalsView: React.FC = () => {
  const { proposalsFiltradas, activeTab, setActiveTab, setFiltroEstado, fetchProposals } = useProposal()

  return (
    <>
      {/* CONTENEDOR DEL SWIPER */}
      <TabsProposals
        items={estadoPropuestas}
        activeKey={activeTab}
        onChange={(value) => {
          setActiveTab(value as ProposalStatus)
          setFiltroEstado(value as ProposalStatus)
          localStorage.setItem('activeProposalTab', value)
        }}
      />

      {/* LISTA FILTRADA */}
      <GridRow>
        {proposalsFiltradas.map((proposal) => (
          <ProposalsList key={proposal._id} proposal={proposal} onVoted={fetchProposals}/>
        ))}
      </GridRow>
    </>
  )
}
