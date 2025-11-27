// import { HeaderEntity } from "../../HeaderEntity";
import { ModalGeneral } from "../../ModalGeneral";
import { ProposalForm } from "./../ProposalForm";
import { FormGeneral } from "../../FormGeneral";
import { useProposalViewById } from "../../../hooks/Proposal/useProposalViewById";
import { GridRow } from "../../GridRow";
import { Col } from "antd";
import { getStatusColor } from "../../../utils/utilsProposals";
import { FileTextOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { CardProposalById } from "./CardProposalById";
import { HeaderReturn } from "../../HeaderReturn";


export const ProposalsViewById = () => {

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
      <HeaderReturn titulo={"Mis Propuestas"} />

      {/* lista de propuestas */}
      <GridRow>
        {proposals.map((proposal) => (
          <Col xs={24} sm={12} lg={8} key={proposal._id}>
            <CardProposalById
              title={proposal.tituloPropuesta}
              icon={<FileTextOutlined style={{ color: getStatusColor(proposal.estado) }} />}
              borderColor={getStatusColor(proposal.estado)}
              onEdit={() => openModalProposal && openModalProposal(proposal)}
              onDelete={() => handleDelete && handleDelete(proposal._id)}
            >
              {proposal.descripcion}

              <div style={{ marginTop: 12, fontSize: 12, color: "#91caff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <TrophyOutlined /> {proposal.desafioId.titulo}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <UserOutlined /> {proposal.emprendedorId.nombreCompleto}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

                  <span
                    style={{
                      cursor: "pointer",
                      fontSize: "25px",
                      transition: "0.2s",
                    }}
                  >
                    ★
                  </span>

                </div>

                <span>{proposal.puntos} puntos</span>
                <div style={{ marginTop: 4 }}>
                  <span
                    style={{
                      padding: "2px 6px",
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      backgroundColor: getStatusColor(proposal.estado),
                      color: "#fff",
                    }}
                  >
                    {proposal.estado}
                  </span>
                </div>
              </div>
            </CardProposalById>
          </Col>
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
