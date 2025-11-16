import { useEffect, useState } from "react";
import type {
  IProposal,
  IChallenge,
  ProposalStatus,
  IUser,
} from "../../types/types";
import { storage } from "../../storage";
import { type FormInstance } from "antd";
import { proposalService } from "../../services/ProposalService";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth/useAuth";

export const useProposalView = () => {
  const { _id } = useAuth();
  const [challenges] = useState<IChallenge[]>(storage.getChallenges());
  const [users] = useState<IUser[]>(storage.getUsers());
  const entrepreneurs = users.filter((u) => u.role === "emprendedor");

  const [isModalProposalOpen, setIsModalProposalOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<IProposal | null>(null);
  const currentEntrepreneurId = _id;

  const [proposals, setProposals] = useState<IProposal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const data = await proposalService.getAll();
        setProposals(data);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar las empresas");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const [votedProposals, setVotedProposals] = useState<string[]>(
    JSON.parse(localStorage.getItem("votedProposals") || "[]")
  );

  const toggleVoto = (proposalId: string) => {
    const yaVoto = votedProposals.includes(proposalId);

    const updated = allProposals.map((p) => {
      if (p._id === proposalId) {
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

  const [selectedChallenge, setSelectedChallenge] = useState<IChallenge | null>(
    null
  );

  const allProposals = proposals; // Todas las propuestas
  const entrepreneurProposals = currentEntrepreneurId
    ? proposals.filter((c) => c.emprendedorId === currentEntrepreneurId)
    : [];

  const openModalProposal = (
    proposal?: IProposal,
    challenge?: IChallenge,
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
        emprendedorId: entrepreneurs.length > 0 ? entrepreneurs[0]._id : "",
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

  const handleSubmitProposal = async (values: any) => {
    try {
    if (editingProposal) {
      const updatedProposal = await proposalService.update(editingProposal._id, values);
      const updated = proposals.map((p) =>
        p._id === editingProposal._id ? updatedProposal : p
      );
      setProposals(updated);
      
    } else {
      const newProposal = await proposalService.create({
        ...values,
        desafioId: selectedChallenge?._id,
        emprendedorId: _id,
      });
      const updated = [...proposals, newProposal];
      setProposals(updated);
      
    }
    closeModalProposal();
    } catch (error) {
      console.error("Error al crear/actualizar propuesta", error);
    }
};

  const handleDelete = (id: string) => {
    const updated = proposals.filter((p) => p._id !== id);
    setProposals(updated);
    storage.setProposals(updated);
  };

  const getChallengeName = (desafioId: string) => {
    const challenge = challenges.find((c) => c._id === desafioId);
    return challenge ? challenge.titulo : "Desafío desconocido";
  };

  const getEntrepreneurName = (emprendedorId: string) => {
    const entrepreneur = entrepreneurs.find((e) => e._id === emprendedorId);
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
      p._id === id ? { ...p, estado: nuevoEstado } : p
    );

    setProposals(updated);
    storage.setProposals(updated);
  };

  return {
    votedProposals,
    loading,
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
