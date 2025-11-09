import { useProposalView } from "../../hooks/Proposal/useProposalView";
import { ProposalsList } from "./ProposalsList";
import { HeaderEntity } from "../HeaderEntity";
import { ModalGeneral } from "../ModalGeneral";
import { ProposalForm } from "./ProposalForm";
import { FormGeneral } from "../FormGeneral";
import { Form } from "antd";

interface ProposalsViewProps {
  titulo: string;
  readOnly?: boolean;
  showButtonNew?: boolean;
}

export const ProposalsView: React.FC<ProposalsViewProps> = ({ titulo, readOnly, showButtonNew }) => {
  const formProposal = Form.useForm()[0];
  const {
    votedProposals,
    challenges,
    entrepreneurs,
    currentEntrepreneurId,
    allProposals,
    entrepreneurProposals,
    isModalProposalOpen,
    editingProposal,
    selectedChallenge,
    openModalProposal,
    closeModalProposal,
    handleSubmitProposal,
    handleDelete,
    getChallengeName,
    getEntrepreneurName,
    getStatusColor,
    onChangeEstado,
    toggleVoto
  } = useProposalView();

  return (
    <>
      {/* Encabezado */}
      <HeaderEntity titulo={titulo} onClick={() => openModalProposal()} readOnly={readOnly} />

      {/* lista de propuestas */}
      <ProposalsList
        votedProposals={votedProposals}
        proposals={currentEntrepreneurId ? entrepreneurProposals : allProposals}
        getStatusColor={getStatusColor}
        getChallengeName={getChallengeName}
        getEntrepreneurName={getEntrepreneurName}
        openModalProposal={!readOnly ? openModalProposal : undefined}
        handleDelete={!readOnly ? handleDelete : undefined}
        onChangeEstado={readOnly ? onChangeEstado : undefined}
        toggleVoto={toggleVoto}
        readOnly={readOnly}
        showButtonNew={showButtonNew}
      />


      {/* Modal de creación/edición */}
      <ModalGeneral
        isOpen={isModalProposalOpen}
        onClose={closeModalProposal}
        onOk={() => formProposal.submit()}
        editing={!!editingProposal}
      >
        <FormGeneral form={formProposal} handleSubmit={handleSubmitProposal}>
          <ProposalForm challenges={challenges} entrepreneurs={entrepreneurs} selectedChallenge={selectedChallenge} />
        </FormGeneral>
      </ModalGeneral>
    </>
  );
}
