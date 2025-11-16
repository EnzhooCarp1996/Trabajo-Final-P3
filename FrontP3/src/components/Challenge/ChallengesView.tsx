import { useProposal } from "../../hooks/Proposal/useProposal";
import type { IChallenge } from "../../types/types";
import { ProposalForm } from "../Proposal/ProposalForm";
import { ChallengeList } from "./ChallengeList";
import { HeaderEntity } from "../HeaderEntity";
import { ModalGeneral } from "../ModalGeneral";
import { FormGeneral } from "../FormGeneral";
import { useEffect, useState } from "react";
import { challengeService } from "../../services/ChallengeService";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth/useAuth";
import { GridRow } from "../GridRow";

interface ChallengesViewProps {
    showButtonNew?: boolean;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({ showButtonNew }) => {
    const { role } = useAuth();
    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const {
        formProposal,
        isModalProposalOpen,
        editingProposal,
        selectedChallenge,
        closeModalProposal,
        openModalProposal,
        handleSubmitProposal,
    } = useProposal();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChallenges = async () => {
            setLoading(true);
            try {
                const data = await challengeService.getAll({ estado: "activo" });
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
            {/* onClick={() => openModal()} readOnly={readOnly} */}
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
                                readOnly={role === "empresa"}
                                showButtonNew={showButtonNew}
                                openModalProposal={(challenge) => openModalProposal(challenge)}
                            />
                        ))}
                    </GridRow>

                    {/* Modal de creación de propuestas */}
                    {role === "emprendedor" && (
                            <ModalGeneral
                                titulo={"Propuesta"}
                                isOpen={isModalProposalOpen}
                                onClose={closeModalProposal}
                                onOk={() => formProposal.submit()}
                                editing={!!editingProposal}
                            >
                                <FormGeneral form={formProposal} handleSubmit={handleSubmitProposal}>
                                    <ProposalForm selectedChallenge={selectedChallenge} />
                                </FormGeneral>
                            </ModalGeneral>
                    )}

                </>
            )}
        </>
    );
}


