import { useEffect, useState } from "react";
import type { IUser } from "../../types/types";
import { userService } from "../../services/UserService";
import toast from "react-hot-toast";

export const useEntrepreneurView = () => {
    const [entrepreneurs, setEntrepreneurs] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedEntrepreneur, setSelectedEntrepreneur] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
      const fetchEntrepreneurs = async () => {
        setLoading(true);
        try {
          const data = await userService.getAllByRole("emprendedor");
          setEntrepreneurs(data);
        } catch (error) {
          console.error(error);
          toast.error("Error al cargar las empresas");
        } finally {
          setLoading(false);
        }
      };
  
      fetchEntrepreneurs();
    }, []);

    const openModal = (entrepreneur: any) => {
        setSelectedEntrepreneur(entrepreneur);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEntrepreneur(null);
    };

  return {
    entrepreneurs,
    loading,
    selectedEntrepreneur,
    isModalOpen,
    openModal,
    closeModal
  };
};
