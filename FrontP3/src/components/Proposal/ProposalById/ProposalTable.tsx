import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IProposal } from "../../../types/types";
import { useEffect, useState } from "react";
import { proposalService } from "../../../services/ProposalService";
import toast from "react-hot-toast";

interface ProposalTableProps {
  emprendedorId: string;
}

export const ProposalTable = ({ emprendedorId }: ProposalTableProps) => {
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
      width: 120,
      onCell: () => ({ style: cellBodyStyle }),
      render: (estado: string) => (
        <Tag color={estado === "seleccionada" ? "green" : "blue"}>
          {estado}
        </Tag>
      ),
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
        const data = await proposalService.getAll({ emprendedorId });
        setProposals(data);
      } catch (error) {
        toast.error("Error al cargar las propuestas");
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [emprendedorId ]);

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
