import type { IChallenge, ChallengeStatus } from "../../types/types";
import { cellBodyStyle } from "../../utils/utilsChallenges";
import { useAuth } from "../../context/Auth/useAuth";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { Tag } from "antd";

export const ChallengeTableConfig = (openModalProposal: (challenge: IChallenge) => void) => {
  const { role } = useAuth();

  return useMemo(() => {
    return [
      {
        title: "Título",
        dataIndex: "titulo",
        key: "titulo",
        width: 180,
        responsive: ["xs", "sm", "md", "lg"],
        onCell: () => ({ style: cellBodyStyle }),
      },
      {
        title: "Descripción",
        dataIndex: "descripcion",
        key: "descripcion",
        width: 250,
        responsive: ["md", "lg"],
        onCell: () => ({ style: cellBodyStyle }),
      },
      {
        title: "Estado",
        dataIndex: "estado",
        key: "estado",
        width: 120,
        responsive: ["xs", "sm", "md", "lg"],
        onCell: () => ({ style: cellBodyStyle }),
        render: (estado: ChallengeStatus) => (
          <Tag color={estado === "activo" ? "green" : estado === "finalizado" ? "blue" : "red"}>
            {estado}
          </Tag>
        ),
      },
      {
        title: "Fecha",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 120,
        responsive: ["sm", "md", "lg"],
        onCell: () => ({ style: cellBodyStyle }),
        render: (date: string) => new Date(date).toLocaleDateString(),
      },
      ...(role === "emprendedor"
        ? [
          {
            key: "acciones",
            width: 80,
            onCell: () => ({ style: cellBodyStyle }),
            render: (_: any, record: IChallenge) =>
              record.estado === "finalizado" ? null : (
                <div
                  onClick={() => openModalProposal(record)}
                  style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: "#1677ff", fontWeight: 500 }}
                >
                  <PlusOutlined style={{ fontSize: 18 }} />
                  <span>Propuesta</span>
                </div>
              ),
          }
        ]
        : []),
    ] as ColumnsType<IChallenge>;
  }, [role, openModalProposal]);
}