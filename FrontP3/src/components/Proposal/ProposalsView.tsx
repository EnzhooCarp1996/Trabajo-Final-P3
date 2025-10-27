import { useState } from "react";
import {
  FileTextOutlined,
  TrophyOutlined,
  UserOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Col, Form } from "antd";
import type { Proposal, Challenge, Entrepreneur } from "../../types/types";
import { storage } from "../../storage";
import { FormGeneral } from "../FormGeneral";
import { HeaderEntidad } from "../HeaderEntidad";
import { ModalGeneral } from "../ModalGeneral";
import { ProposalForm } from "./ProposalForm";
import { EntidadCard } from "../CardEntidad";
import { GridRow } from "../GridRow";


export const ProposalsView = () => {
  const [proposals, setProposals] = useState<Proposal[]>(storage.getProposals());
  const [challenges] = useState<Challenge[]>(storage.getChallenges());
  const [entrepreneurs] = useState<Entrepreneur[]>(storage.getEntrepreneurs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);

  const [form] = Form.useForm();

  const openModal = (proposal?: Proposal) => {
    if (proposal) {
      setEditingProposal(proposal);
      form.setFieldsValue(proposal);
    } else {
      setEditingProposal(null);
      form.resetFields();
      form.setFieldsValue({
        desafioId: challenges.length > 0 ? challenges[0].id : '',
        emprendedorId: entrepreneurs.length > 0 ? entrepreneurs[0].id : '',
        estado: "en revisión",
        puntos: 0,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProposal(null);
  };

  const handleSubmit = (values: any) => {
    if (editingProposal) {
      const updated = proposals.map(p =>
        p.id === editingProposal.id ? { ...p, ...values } : p
      );
      setProposals(updated);
      storage.setProposals(updated);
    } else {
      const newProposal: Proposal = {
        id: storage.generateId(),
        fechaCreacion: new Date().toISOString(),
        ...values,
      };
      const updated = [...proposals, newProposal];
      setProposals(updated);
      storage.setProposals(updated);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    const updated = proposals.filter(p => p.id !== id);
    setProposals(updated);
    storage.setProposals(updated);
  };

  const getChallengeName = (desafioId: string) => {
    const challenge = challenges.find(c => c.id === desafioId);
    return challenge ? challenge.titulo : "Desafío desconocido";
  };

  const getEntrepreneurName = (emprendedorId: string) => {
    const entrepreneur = entrepreneurs.find(e => e.id === emprendedorId);
    return entrepreneur ? entrepreneur.nombreCompleto : "Emprendedor desconocido";
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "seleccionada":
        return "#52c41a"; // verde
      case "descartada":
        return "#f5222d"; // rojo
      default:
        return "#1677ff"; // azul
    }
  };

  return (
    <>
      {/* Encabezado */}
      <HeaderEntidad titulo="Propuestas" texto="Nueva Propuesta" onClick={() => openModal()} />

      {/* lista de propuestas */}
      <GridRow>
        {proposals.map((proposal) => (
          <Col xs={24} sm={12} lg={8} key={proposal.id}>
            <EntidadCard
              title={proposal.tituloPropuesta}
              icon={<FileTextOutlined style={{ color: getStatusColor(proposal.estado) }} />}
              borderColor={getStatusColor(proposal.estado)}
              onEdit={() => openModal(proposal)}
              onDelete={() => handleDelete(proposal.id)}
            >
              {proposal.descripcion}
              <div style={{ marginTop: 12, fontSize: 12, color: "#91caff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <TrophyOutlined /> {getChallengeName(proposal.desafioId)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <UserOutlined /> {getEntrepreneurName(proposal.emprendedorId)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <StarOutlined /> {proposal.puntos} puntos
                </div>
                <div style={{ marginTop: 4 }}>
                  <span style={{ padding: "2px 6px", borderRadius: 4, fontSize: 12, fontWeight: 600, backgroundColor: getStatusColor(proposal.estado), color: "#fff" }}>
                    {proposal.estado}
                  </span>
                </div>
              </div>
            </EntidadCard>
          </Col>
        ))}
      </GridRow>

      {/* Modal de creación/edición */}
      <ModalGeneral
        isOpen={isModalOpen}
        onClose={closeModal}
        onOk={() => form.submit()}
        editing={!!editingProposal}
      >
        <FormGeneral form={form} handleSubmit={handleSubmit}>
          <ProposalForm challenges={challenges} entrepreneurs={entrepreneurs} />
        </FormGeneral>
      </ModalGeneral>
    </>
  );
}
