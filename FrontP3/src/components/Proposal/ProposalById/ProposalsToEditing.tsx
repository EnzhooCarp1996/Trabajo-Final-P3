import type { IChallenge, IEntrepreneurRef, IProposal, ProposalStatus } from "../../../types/types";
import { EntrepreneurProfile } from "../../Entrepreneur/EntrepreneurProfile";
import { proposalService } from "../../../services/ProposalService";
import { ProposalTableColumns } from "../ProposalTableColumns";
import { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { challengeService } from "../../../services/ChallengeService";
import { BackHeader } from "../../BackHeader";


const { Title } = Typography;

export const ProposalsToEditing = () => {
    const { id } = useParams();
    const [proposals, setProposals] = useState<IProposal[]>([]);
    const [loading, setLoading] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [challenge, setChallenge] = useState<IChallenge | null>(null);
    const [selectedEntrepreneur, setSelectedEntrepreneur] = useState<IEntrepreneurRef | null>(null);

    const openProfileModal = (entrepreneur: IEntrepreneurRef) => {
        setSelectedEntrepreneur(entrepreneur);
        setOpenProfile(true);
    };


    useEffect(() => {
        const fetchChallenge = async () => {
            setLoading(true);
            try {
                const data = await challengeService.getById(id!);
                setChallenge(data);
            } catch (error) {
                toast.error("Error al cargar el desafio");
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, [id]);

    useEffect(() => {
        const fetchProposals = async () => {
            setLoading(true);
            try {
                const data = await proposalService.getAll({ desafioId: id });
                setProposals(data);
            } catch (error) {
                toast.error("Error al cargar las propuestas");
            } finally {
                setLoading(false);
            }
        };

        fetchProposals();
    }, [id]);

    const handleEstadoChange = async (id: string, nuevoEstado: ProposalStatus) => {
        try {
            await proposalService.update(id, { estado: nuevoEstado });

            // Actualizar tabla local sin volver a llamar al servidor
            setProposals(prev =>
                prev.map((p) =>
                    p._id === id ? { ...p, estado: nuevoEstado } : p
                )
            );

            toast.success("Estado actualizado");
        } catch (error) {
            toast.error("Error al actualizar estado");
        }
    };

    const columns = ProposalTableColumns({
        showSelectEstado: true,
        showEmprendedor: true,
        onEstadoChange: handleEstadoChange,
        openEmprendedor: openProfileModal
    });

    return (
        <>
            <BackHeader />
            <div style={{ width: "auto", margin: "0 auto", minHeight: 300 }}>
                <Title level={3} style={{ color: '#8c8c8c', marginBottom: 0, marginTop: 0 }}>
                    Propuestas de: {challenge?.titulo}
                </Title>
                <div style={{ fontSize: 18, color: "#666", lineHeight: 3.5 }}>
                    {challenge?.descripcion}
                </div>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <>
                        <Table
                            rowKey="_id"
                            columns={columns.map((col) => ({
                                ...col,
                                onHeaderCell: () => ({ style: { backgroundColor: "#001529", color: "white", fontWeight: "bold" } })
                            }))}
                            dataSource={proposals}
                            scroll={{ x: 700, y: 400 }}
                        />
                        {selectedEntrepreneur && (
                            <EntrepreneurProfile
                                open={openProfile}
                                onClose={() => setOpenProfile(false)}
                                _id={selectedEntrepreneur._id}
                            />
                        )}

                    </>
                )}
            </div>
        </>
    );
};


