import { useEffect, useState, type FC } from "react";
import { proposalService } from "../../services/ProposalService";
import { Spin, Timeline } from "antd";

interface ProposalsToModalProps {
  _id: string;
}

export const ProposalsToModal: FC<ProposalsToModalProps> = ({ _id }) => {
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

  if (loading) return <Spin />;

  if (proposals.length === 0) return <p>No tiene propuestas.</p>;

  return (
    <Timeline
      items={proposals.map((p) => ({
        color: "blue",
        children: (
          <span>
            <b>{p.tituloPropuesta}</b> — {p.estado}
          </span>
        ),
      }))}
    />
  );
};
