import { Table, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IProposal, ProposalStatus } from "../../../types/types";
import { useEffect, useState } from "react";
import { proposalService } from "../../../services/ProposalService";
import toast from "react-hot-toast";

interface ProposalByChallengeProps {
    desafioId: string;
}

export const ProposalByChallenge = ({ desafioId }: ProposalByChallengeProps) => {
    const tableHeaderStyle: React.CSSProperties = {
        backgroundColor: "#001529",
        color: "white",
        fontWeight: "bold",
    };
    const cellBodyStyle: React.CSSProperties = {
        backgroundColor: "#002140",
        color: "white",
        borderBottom: "3px solid #003a6c",
    };
    const estadoOptions = [
        { label: "En revisión", value: "en revision" },
        { label: "Seleccionada", value: "seleccionada" },
        { label: "Descartada", value: "descartada" },
    ];

    const columns: ColumnsType<IProposal> = [
        {
            title: "Título",
            dataIndex: "tituloPropuesta",
            key: "tituloPropuesta",
            width: 180,
            onCell: () => ({ style: cellBodyStyle }),
        },
        {
            title: "Descripción",
            dataIndex: "descripcion",
            key: "descripcion",
            width: 250,
            onCell: () => ({ style: cellBodyStyle }),
        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            width: 100,
            onCell: () => ({ style: cellBodyStyle }),
            render: (_, record) => (
                <Select
                    value={record.estado}
                    style={{ width: "100%" }}
                    options={estadoOptions}
                    onChange={(value) => handleEstadoChange(record._id, value)}
                />
            )
        },
        {
            title: "Fecha",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 120,
            onCell: () => ({ style: cellBodyStyle }),
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
    ];

    const [proposals, setProposals] = useState<IProposal[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProposals = async () => {
            setLoading(true);
            try {
                const data = await proposalService.getAll({ desafioId });
                setProposals(data);
            } catch (error) {
                toast.error("Error al cargar las propuestas");
            } finally {
                setLoading(false);
            }
        };

        fetchProposals();
    }, [desafioId]);

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


    return (
        <div style={{ width: "auto", margin: "0 auto", minHeight: 400 }}>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <Table
                    rowKey="_id"
                    columns={columns.map((col) => ({
                        ...col,
                        onHeaderCell: () => ({ style: tableHeaderStyle }),
                    }))}
                    dataSource={proposals}
                    scroll={{ x: 700, y: 400 }}
                />
            )}
        </div>
    );
};
