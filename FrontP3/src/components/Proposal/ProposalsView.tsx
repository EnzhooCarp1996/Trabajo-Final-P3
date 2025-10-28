import { useProposalView } from "../../hooks/Proposal/useProposalView";
import { ProposalsList } from "./ProposalsList";
import { HeaderEntity } from "../HeaderEntity";
import { ModalGeneral } from "../ModalGeneral";
import { ProposalForm } from "./ProposalForm";
import { FormGeneral } from "../FormGeneral";
import { Form } from "antd";


export const ProposalsView = () => {
  const formProposal = Form.useForm()[0];
  const {
    proposals,
    challenges,
    entrepreneurs,
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
  } = useProposalView();

  return (
    <>
      {/* Encabezado */}
      <HeaderEntity titulo="Propuestas" onClick={() => openModalProposal()} />

      {/* lista de propuestas */}
      <ProposalsList
        proposals={proposals}
        getStatusColor={getStatusColor}
        getChallengeName={getChallengeName}
        getEntrepreneurName={getEntrepreneurName}
        openModalProposal={openModalProposal}
        handleDelete={handleDelete}
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
