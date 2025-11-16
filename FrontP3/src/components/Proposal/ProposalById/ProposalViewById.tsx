import { ProposalsList } from "./../ProposalsList";
import { HeaderEntity } from "../../HeaderEntity";
import { ModalGeneral } from "../../ModalGeneral";
import { ProposalForm } from "./../ProposalForm";
import { FormGeneral } from "../../FormGeneral";
import { useProposalViewById } from "../../../hooks/Proposal/useProposalViewById";
import { GridRow } from "../../GridRow";

interface ProposalsViewProps {
  readOnly?: boolean;
}

export const ProposalsViewById: React.FC<ProposalsViewProps> = ({ readOnly }) => {

  const {
    formProposal,
    proposals,
    isModalProposalOpen,
    editingProposal,
    selectedChallenge,
    openModalProposal,
    closeModalProposal,
    handleSubmitProposalById,
    handleDelete,
  } = useProposalViewById();

  return (
    <>
      {/* Encabezado */}
      <HeaderEntity titulo={"Mis Propuestas"} />

      {/* lista de propuestas */}
      <GridRow>
        {proposals.map((proposal, index) => (
          <ProposalsList
            key={index}
            proposal={proposal}
            openModalProposal={!readOnly ? (p) => openModalProposal(p, formProposal) : undefined}
            handleDelete={!readOnly ? handleDelete : undefined}
          />
        ))}
      </GridRow>


      {/* Modal de edición */}
      <ModalGeneral
        titulo={"Propuesta"}
        isOpen={isModalProposalOpen}
        onClose={closeModalProposal}
        onOk={() => formProposal.submit()}
        editing={!!editingProposal}
      >
        <FormGeneral form={formProposal} handleSubmit={handleSubmitProposalById}>
          <ProposalForm selectedChallenge={selectedChallenge} />
        </FormGeneral>
      </ModalGeneral>
    </>
  );
}
