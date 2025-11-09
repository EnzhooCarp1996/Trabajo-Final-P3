import { useState } from "react";
import type {
  Proposal,
  Challenge,
  ProposalStatus,
  User,
} from "../../types/types";
import { storage } from "../../storage";
import { type FormInstance } from "antd";
import { useParams } from "react-router-dom";

export const useProposalView = () => {
  const [proposals, setProposals] = useState<Proposal[]>(
    storage.getProposals()
  );
  const [challenges] = useState<Challenge[]>(storage.getChallenges());
  const [users] = useState<User[]>(storage.getUsers());
  const entrepreneurs = users.filter((u) => u.role === "emprendedor");

  const [isModalProposalOpen, setIsModalProposalOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const params = useParams<{ entrepreneurId: string }>();
  const currentEntrepreneurId = params.entrepreneurId;

  const [votedProposals, setVotedProposals] = useState<string[]>(
    JSON.parse(localStorage.getItem("votedProposals") || "[]")
  );

  const toggleVoto = (proposalId: string) => {
    const yaVoto = votedProposals.includes(proposalId);

    const updated = allProposals.map((p) => {
      if (p.id === proposalId) {
        return { ...p, puntos: yaVoto ? p.puntos - 1 : p.puntos + 1 };
      }
      return p;
    });

    setProposals(updated);
    storage.setProposals(updated);

    let updatedVotes;

    if (yaVoto) {
      updatedVotes = votedProposals.filter((id) => id !== proposalId);
    } else {
      updatedVotes = [...votedProposals, proposalId];
    }

    setVotedProposals(updatedVotes);
    localStorage.setItem("votedProposals", JSON.stringify(updatedVotes));
  };

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );

  const allProposals = proposals; // Todas las propuestas
  const entrepreneurProposals = currentEntrepreneurId
    ? proposals.filter((c) => c.emprendedorId === currentEntrepreneurId)
    : [];

  const openModalProposal = (
    proposal?: Proposal,
    challenge?: Challenge,
    form?: FormInstance
  ) => {
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
    return entrepreneur
      ? entrepreneur.nombreCompleto
      : "Emprendedor desconocido";
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

  const onChangeEstado = (id: string, nuevoEstado: ProposalStatus) => {
    const updated = proposals.map((p) =>
      p.id === id ? { ...p, estado: nuevoEstado } : p
    );

    setProposals(updated);
    storage.setProposals(updated);
  };

  return {
    votedProposals,
    proposals,
    challenges,
    currentEntrepreneurId,
    allProposals,
    entrepreneurProposals,
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
    onChangeEstado,
    toggleVoto,
  };
};
