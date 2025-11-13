import { useState } from "react";
import { storage } from "../../storage";
import type { IUser } from "../../types/types";

export const useEntrepreneurView = () => {
  const [users] = useState<IUser[]>(storage.getUsers());
  const entrepreneurs = users.filter((u) => u.role === "emprendedor");

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
    getProposalCount,
  };
};
