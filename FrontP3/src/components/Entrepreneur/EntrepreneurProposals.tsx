import { useEffect, useState, type FC } from "react";
import { proposalService } from "../../services/ProposalService";

interface EntrepreneurProposalsProps {
  _id: string;
}

export const EntrepreneurProposals: FC<EntrepreneurProposalsProps> = ({ _id }) => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!_id) return;

    const fetchProposals = async () => {
      setLoading(true);
      try {
        const result = await proposalService.getAll({ emprendedorId: _id });
        setProposals(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [_id]);

  if (loading) return <p>Cargando propuestas...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {proposals.length === 0 && <p>No tiene propuestas.</p>}

      {proposals.map((p) => (
        <div key={p._id} style={{ display: "flex", flexDirection:"column",padding: 8, background: "#006db2", borderRadius: 6 }}>
          <strong>{p.tituloPropuesta}</strong>
        </div>
      ))}
    </div>
  );
};
