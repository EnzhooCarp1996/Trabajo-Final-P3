import { useState } from "react";
import type { Proposal, Challenge, Entrepreneur } from "../../types/types";
import { storage } from "../../storage";
import { type FormInstance } from "antd";

export const useProposalView = () => {
  const [proposals, setProposals] = useState<Proposal[]>(storage.getProposals());
  const [challenges] = useState<Challenge[]>(storage.getChallenges());
  const [entrepreneurs] = useState<Entrepreneur[]>(storage.getEntrepreneurs());
  const [isModalProposalOpen, setIsModalProposalOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);


  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const openModalProposal = (proposal?: Proposal, challenge?: Challenge, form?: FormInstance) => {
    if (proposal) {
      setEditingProposal(proposal);
      setSelectedChallenge(null);
      form?.setFieldsValue(proposal);
    } else {
      setEditingProposal(null);
      setSelectedChallenge(challenge ?? null);
      form?.resetFields();
      form?.setFieldsValue({
        desafioId: challenge ? challenge.titulo : "",
        emprendedorId: entrepreneurs.length > 0 ? entrepreneurs[0].id : "",
        estado: "en revisión",
        puntos: 0,
      });
    }
    setIsModalProposalOpen(true);
  };


  const closeModalProposal = () => {
    setIsModalProposalOpen(false);
    setEditingProposal(null);
  };

  const handleSubmitProposal = (values: any) => {
    if (editingProposal) {
      const updated = proposals.map((p) =>
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
    closeModalProposal();
  };

  const handleDelete = (id: string) => {
    const updated = proposals.filter((p) => p.id !== id);
    setProposals(updated);
    storage.setProposals(updated);
  };

  const getChallengeName = (desafioId: string) => {
    const challenge = challenges.find((c) => c.id === desafioId);
    return challenge ? challenge.titulo : "Desafío desconocido";
  };

  const getEntrepreneurName = (emprendedorId: string) => {
    const entrepreneur = entrepreneurs.find((e) => e.id === emprendedorId);
    return entrepreneur ? entrepreneur.nombreCompleto : "Emprendedor desconocido";
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "seleccionada":
        return "#52c41a";
      case "descartada":
        return "#f5222d";
      default:
        return "#1677ff";
    }
  };

  return {
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
  };
};
