import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IChallenge, ChallengeStatus } from "../../types/types";
import { useEffect, useState } from "react";
import { challengeService } from "../../services/ChallengeService";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth/useAuth";



export const ChallengeTable = (
) => {
    const tableHeaderStyle: React.CSSProperties = {
        backgroundColor: "#002140",
        color: "white",
        fontWeight: "bold",
    };
    const columns: ColumnsType<IChallenge> = [
        {
            title: "Título",
            dataIndex: "titulo",
            key: "titulo",
            width: 180,
            responsive: ["xs", "sm", "md", "lg"],
        },
        {
            title: "Descripción",
            dataIndex: "descripcion",
            key: "descripcion",
            width: 250,
            responsive: ["md", "lg"],
        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            width: 120,
            responsive: ["xs", "sm", "md", "lg"],
            render: (estado: ChallengeStatus) => (
                <Tag color={estado === "activo" ? "green" : "red"}>{estado}</Tag>
            ),
        },
        {
            title: "Fecha",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 120,
            responsive: ["sm", "md", "lg"],
            render: (date: string) => new Date(date).toLocaleDateString(),
        },

    ];
    const { _id } = useAuth();
    const [challenges, setChallenges] = useState<IChallenge[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchChallenges = async () => {
            setLoading(true);
            try {
                const data = await challengeService.getAll({ empresaId: _id });
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
        <div style={{ maxWidth: 800, margin: "0 auto", minHeight: 400, overflowX: "auto" }}>
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
    );
};
