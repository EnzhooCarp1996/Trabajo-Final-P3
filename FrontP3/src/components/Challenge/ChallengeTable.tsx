import { Table } from "antd";
import type { IChallenge } from "../../types/types";
import { useEffect, useState } from "react";
import { challengeService } from "../../services/ChallengeService";
import toast from "react-hot-toast";
import { ModalGeneral } from "../ModalGeneral";
import { FormGeneral } from "../FormGeneral";
import { ProposalForm } from "../Proposal/ProposalForm";
import { useProposal } from "../../hooks/Proposal/useProposal";
import { getChallengeColumns, tableHeaderStyle } from "./ChallengeTableConfig";
import { useAuth } from "../../context/Auth/useAuth";


interface ChallengeTableProps {
    empresaId: string;
}

export const ChallengeTable = ({ empresaId }: ChallengeTableProps) => {
    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(false);
    const {
        formProposal,
        isModalProposalOpen,
        editingProposal,
        selectedChallenge,
        closeModalProposal,
        openModalProposal,
        handleSubmitProposal,
    } = useProposal();
    const { role } = useAuth();
    const columns = getChallengeColumns(openModalProposal, role);
    
    useEffect(() => {
        const fetchChallenges = async () => {
            setLoading(true);
            try {
                const data = await challengeService.getAll({ empresaId, estado: ["activo", "finalizado"] });
                setChallenges(data);
            } catch (error) {
                console.error(error);
                toast.error("Error al cargar tus desafios");
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    return (
        <>
            <div style={{ width: "auto", margin: "0 auto", height: "auto", overflowX: "auto" }}>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <Table
                        rowKey="_id"
                        columns={columns.map(col => ({
                            ...col,
                            onHeaderCell: () => ({ style: tableHeaderStyle })
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
