import { useEffect, useState } from "react";
import { storage } from "../../storage";
import type { IUser } from "../../types/types";
import { userService } from "../../services/UserService";
import toast from "react-hot-toast";

export const useEntrepreneurView = () => {
    const [entrepreneurs, setEntrepreneurs] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
  
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

  const getProposalCount = (entrepreneurId: string) => {
    const proposals = storage.getProposals();
    return proposals.filter((p) => p.emprendedorId === entrepreneurId).length;
  };

  // const handleDelete = (id: string) => {
  //     const updated = entrepreneurs.filter((e) => e.id !== id);
  //     setEntrepreneurs(updated);
  //     storage.setEntrepreneurs(updated);
  // };

  return {
    entrepreneurs,
    loading,
    getProposalCount,
  };
};
