import type { IProposal, IChallengeRef } from "../../types/types";
import { proposalService } from "../../services/ProposalService";
import { useAuth } from "../../context/Auth/useAuth";
import { Form, type FormInstance } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

export const useProposalViewById = () => {
  const { _id } = useAuth();
  const formProposal = Form.useForm()[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<IProposal | null>(null);
  const [proposals, setProposals] = useState<IProposal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await proposalService.getAll({ emprendedorId: _id });
        setProposals(data);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar tus propuestas");
      } 
    };

    fetchProposals();
  }, []);

  const [selectedChallenge, setSelectedChallenge] = useState<IChallengeRef | null>(
    null
  );


const openModal = (proposal: IProposal, form?: FormInstance) => {
  setEditing(proposal);
  setSelectedChallenge(proposal.desafioId);
  form?.setFieldsValue({
    tituloPropuesta: proposal.tituloPropuesta,
    descripcion: proposal.descripcion,
  });
  setIsModalOpen(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

const handleSubmitProposalById = async (values: any) => {
  if (!editing) return;

  Modal.confirm({
    title: "Actualizar propuesta",
    content: "¿Estás seguro de que querés guardar los cambios?",
    okText: "Sí",
    cancelText: "No",
    onOk: async () => {
      try {
        const updatedProposal = await proposalService.update(editing._id, values);
        const updated = proposals.map((p) =>
          p._id === editing._id ? updatedProposal : p
        );
        setProposals(updated);
        toast.success("Propuesta actualizada correctamente");
        closeModal();
      } catch (error) {
        console.error("Error al actualizar propuesta", error);
        toast.error("No se pudo actualizar la propuesta");
      }
    },
  });
};

const handleDelete = (id: string) => {
  Modal.confirm({
    title: "Eliminar propuesta",
    content: "¿Estás seguro de que querés eliminar esta propuesta?",
    okText: "Sí",
    cancelText: "No",
    onOk: async () => {
      try {
        await proposalService.delete(id);
        setProposals(proposals.filter((p) => p._id !== id));
        toast.success("Propuesta eliminada correctamente");
      } catch (error) {
        console.error(error);
        toast.error("No se pudo eliminar la propuesta");
      }
    },
  });
};



  return {
    formProposal,
    proposals,
    isModalProposalOpen: isModalOpen,
    editingProposal: editing,
    selectedChallenge,
    openModalProposal: openModal,
    closeModalProposal: closeModal,
    handleSubmitProposalById,
    handleDelete,
    navigate
  };
};
