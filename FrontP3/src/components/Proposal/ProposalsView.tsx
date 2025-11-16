import { useProposal } from "../../hooks/Proposal/useProposal";
import { ProposalsList } from "./ProposalsList";
import { HeaderEntity } from "../HeaderEntity";
import { GridRow } from "../GridRow";

interface ProposalsViewProps {
  titulo: string;
  readOnly?: boolean;
}

export const ProposalsView: React.FC<ProposalsViewProps> = ({ titulo, readOnly }) => {
  const {
    proposals,
    onChangeEstado,
  } = useProposal();

  return (
    <>
      {/* Encabezado */}
      <HeaderEntity titulo={titulo} />

      {/* lista de propuestas */}
      <GridRow>
        {proposals.map((proposal, index) => (
          <ProposalsList
            key={index}
            proposal={proposal}
            onChangeEstado={readOnly ? onChangeEstado : undefined}
            readOnly={readOnly}
          />
        ))}
      </GridRow>
    </>
  );
}
