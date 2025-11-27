import type { ColumnsType } from "antd/es/table";
import type { IChallenge, ChallengeStatus } from "../../types/types";
import { Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: "#001529",
  color: "white",
  fontWeight: "bold",
};

export const cellBodyStyle: React.CSSProperties = {
  backgroundColor: "#002140",
  color: "white",
  borderBottom: "3px solid #003a6c",
};

export const getChallengeColumns = (openModalProposal: (record: IChallenge) => void, role: string): ColumnsType<IChallenge> => [
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
  ...(role !== "empresa"
    ? [
      {
        title: "Agregar Propuesta",
        key: "acciones",
        width: 80,
        onCell: () => ({ style: cellBodyStyle }),
        render: (_: any, record: IChallenge) =>
          record.estado === "finalizado" ? null : (
            <PlusOutlined
              style={{
                fontSize: 20,
                color: "#1677ff",
                cursor: "pointer",
              }}
              onClick={() => openModalProposal(record)}
            />
          ),
      },
    ]
    : []),
];
