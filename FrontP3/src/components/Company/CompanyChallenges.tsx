// CompanyChallenges.tsx
import { useEffect, useState, type FC } from "react";
import { challengeService } from "../../services/ChallengeService";

interface CompanyChallengesProps {
  empresaId: string;
}

export const CompanyChallenges: FC<CompanyChallengesProps> = ({ empresaId }) => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!empresaId) return;

    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const result = await challengeService.getAll({ empresaId });
        setChallenges(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [empresaId]);

  if (loading) return <p>Cargando desafíos...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {challenges.length === 0 && <p>No tiene desafíos.</p>}

      {challenges.map((c) => (
        <div
          key={c._id}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 8,
            background: "#006db2",
            borderRadius: 6
          }}
        >
          <strong>{c.titulo}</strong>
        </div>
      ))}
    </div>
  );
};
