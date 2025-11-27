import { useProposal } from "../../hooks/Proposal/useProposal";
import { estados } from "../../utils/utilsProposals";
import { ProposalsList } from "./ProposalsList";
import { GridRow } from "../GridRow";
import "swiper/css/navigation";
import "swiper/css";
import { EstadoTabs } from "../TabsProposals";


export const ProposalsView: React.FC = () => {
  const {
    proposalsFiltradas,
    setFiltroEstado,
  } = useProposal();

  return (
    <>

      {/* CONTENEDOR DEL SWIPER */}
      <EstadoTabs
        items={estados}
        onChange={(value) => setFiltroEstado(value as any)}
      />

      {/* LISTA FILTRADA */}
      <GridRow>
        {proposalsFiltradas.map((proposal, index) => (
          <ProposalsList
            key={index}
            iconoBoton={<span
                    style={{
                        cursor: "pointer",
                        fontSize: "25px",
                        transition: "0.2s",
                    }}
                >
                    ★
                </span>}
            proposal={proposal}
            readOnly
          />
        ))}
      </GridRow>
      
    </>
  );
};
