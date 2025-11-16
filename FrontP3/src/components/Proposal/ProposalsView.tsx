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
}

export const ProposalsView: React.FC<ProposalsViewProps> = ({ titulo, readOnly}) => {
  const formProposal = Form.useForm()[0];
  const {
    votedProposals,
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
      <HeaderEntity titulo={titulo}/>

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
      />


      {/* Modal de creación/edición */}
      <ModalGeneral
        titulo={"Propuesta"}
        isOpen={isModalProposalOpen}
        onClose={closeModalProposal}
        onOk={() => formProposal.submit()}
        editing={!!editingProposal}
      >
        <FormGeneral form={formProposal} handleSubmit={handleSubmitProposal}>
          <ProposalForm selectedChallenge={selectedChallenge} />
        </FormGeneral>
      </ModalGeneral>
    </>
  );
}
