import { challengeService } from "../../services/ChallengeService";
import { useProposal } from "../../hooks/Proposal/useProposal";
import { ChallengeTableConfig } from "./ChallengeTableConfig";
import { ProposalForm } from "../Proposal/ProposalForm";
import type { IChallenge } from "../../types/types";
import { ModalGeneral } from "../ModalGeneral";
import { FormGeneral } from "../FormGeneral";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BackHeader } from "../BackHeader";
import { Table, Typography } from "antd";
import toast from "react-hot-toast";

const { Title } = Typography;

export const ChallengeTable = () => {
    const { id } = useParams();
    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const {
        formProposal,
        isModalProposalOpen,
        editingProposal,
        selectedChallenge,
        closeModalProposal,
        openModalProposal,
        handleSubmitProposal,
    } = useProposal();

    const columns = ChallengeTableConfig(openModalProposal);

    useEffect(() => {
        const fetchChallenges = async () => {
            setLoading(true);
            try {
                const data = await challengeService.getAll({ empresaId: id, estado: ["activo", "finalizado"] });
                setChallenges(data);

                if (data.length > 0) {
                    setCompanyName(data[0].empresaId?.nombreEmpresa ?? "");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error al cargar tus desafios");
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, [id]);

    return (
        <>
        <BackHeader />
            <div style={{ width: "auto", margin: "0 auto", height: "auto", overflowX: "auto" }}>
                <Title level={3} style={{ color: '#8c8c8c', marginBottom: 12 }}>
                    Desafíos de: {companyName}
                </Title>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <Table
                        rowKey="_id"
                        columns={columns.map(col => ({
                            ...col,
                            onHeaderCell: () => ({ style: { backgroundColor: "#001529", color: "white", fontWeight: "bold" } })
                        }))}
                        dataSource={challenges}
                        scroll={{ x: 700, y: 400 }}
                        className="challenge-table"
                    />
                )}
            </div>
            {/* Modal de creación de propuestas */}
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
        </>
    );
};
