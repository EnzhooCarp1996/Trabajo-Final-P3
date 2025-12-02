import { challengeService } from "../../services/ChallengeService";
import { useEffect, useState, type FC } from "react";
import type { IChallenge } from "../../types/types";
import { ChallengeList } from "./ChallengeList";
import { HeaderEntity } from "../HeaderEntity";
import { GridRow } from "../GridRow";
import toast from "react-hot-toast";


export const ChallengesView: FC = () => {
    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChallenges = async () => {
            setLoading(true);
            try {
                const data = await challengeService.getAll({ estado: ["activo"] });
                setChallenges(data);
            } catch (error) {
                console.error(error);
                toast.error("Error al cargar los desafios");
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    return (
        <>
            {/* Encabezado */}
            <HeaderEntity titulo="Desafíos" />

            {/* lista de desafíos */}
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <GridRow>
                        {challenges.map((challenge, index) => (
                            <ChallengeList
                                key={index}
                                challenge={challenge}
                            />
                        ))}
                    </GridRow>
                </>
            )}
        </>
    );
}


