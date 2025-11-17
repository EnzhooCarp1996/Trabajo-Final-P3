import { estados } from "../../utils/utilsProposals";
import { ProposalsList } from "./ProposalsList";
import { EstadoSwiper } from "../EstadoSwiper";
import { GridRow } from "../GridRow";
import { useEffect, useState, type FC } from "react";
import "swiper/css/navigation";
import "swiper/css";
import type { IProposal, ProposalStatus } from "../../types/types";
import { proposalService } from "../../services/ProposalService";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth/useAuth";



export const ProposalsSwiper: FC = () => {
  const { _id } = useAuth();
  const [proposals, setProposals] = useState<IProposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<ProposalStatus>(estados[0].value as ProposalStatus);
  const proposalsFiltradas = proposals.filter((p) => p.estado === filtroEstado);

  useEffect(() => {
    const fetchProposals = async () => {
      setLoading(true);
      try {
        const data = await proposalService.getAll({ emprendedorId: _id });
        setProposals(data);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar tus propuestas");
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);
  return (
    <>
      <div style={{ maxWidth: 800, margin: "0 auto", minHeight: 450, overflowX: "auto" }}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            {/* CONTENEDOR DEL SWIPER */}
            < EstadoSwiper
              items={estados}
              onChange={(value) => setFiltroEstado(value as any)}
            />

            {/* LISTA FILTRADA */}
            <GridRow>
              {proposalsFiltradas.map((proposal, index) => (
                <ProposalsList
                  key={index}
                  iconoBoton={<span
                    style={{
                      cursor: "pointer",
                      fontSize: "25px",
                      transition: "0.2s",
                    }}
                  >
                    ★
                  </span>}
                  proposal={proposal}
                  readOnly={true}
                />
              ))}
            </GridRow>
          </>
        )}
      </div>
    </>
  );
};
