import { useProposalViewById } from "../../../hooks/Proposal/useProposalViewById";
import { ProposalDescriptions } from "./ProposalDescriptions";
import { ProposalStatistics } from "./ProposalStatistics";
import { FileTextOutlined } from "@ant-design/icons";
import { ModalGeneral } from "../../ModalGeneral";
import { ProposalForm } from "./../ProposalForm";
import { FormGeneral } from "../../FormGeneral";
import { Card, List, Typography } from "antd";
import { BackHeader } from "../../BackHeader";

const { Title } = Typography;

export const ProposalsViewById: React.FC = () => {
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
    navigate
  } = useProposalViewById();
  


  return (
    <div style={{ padding: '0 16px' }}>
      {/* Encabezado */}
      {/* <HeaderReturn titulo={"Mis Propuestas"} /> */}
      <BackHeader
        onBack={() => navigate(-1)}
      />

      {/* Estadísticas y Botón */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        padding: '16px 24px',
        backgroundColor: '#213ac4',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <ProposalStatistics proposals={proposals} />
      </div>

      {/* Lista de propuestas */}
      {proposals.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: 60, borderRadius: 12, border: '2px dashed #d9d9d9' }}>
          <FileTextOutlined style={{ fontSize: 48, color: '#bfbfbf', marginBottom: 16 }} />
          <Title level={4} style={{ color: '#8c8c8c', marginBottom: 16 }}>
            No hay propuestas creadas
          </Title>
        </Card>
      ) : (
        <>
          {/* Vista de lista */}
          <Card
            style={{
              borderRadius: 12,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: 'none',
              maxHeight: "60vh",
              overflowY: "auto",
              marginBottom: 16
            }}
            styles={{ body: { padding: "8px 0", backgroundColor: '#213ac4' } }}
          >
            <List
              style={{ backgroundColor: 'transparent' }}
              dataSource={proposals}
              renderItem={(proposal) => (
                <div style={{
                  margin: '8px 16px',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                  <ProposalDescriptions
                    key={proposal._id}
                    proposal={proposal}
                    openModal={openModalProposal}
                    handleDelete={handleDelete}
                  />
                </div>
              )}
            />
          </Card>
        </>
      )}

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
    </div>
  );
};