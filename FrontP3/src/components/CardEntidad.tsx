import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";

const { Text } = Typography;

interface EntidadCardProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  borderColor?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  extraActions?: React.ReactNode[];
  backgroundColor?: string;
}

export const EntidadCard: React.FC<EntidadCardProps> = ({
  title,
  icon,
  children,
  borderColor = "rgba(255,255,255,0.15)",
  onEdit,
  onDelete,
  extraActions = [],
  backgroundColor = "rgba(255,255,255,0.1)",
}) => {
  const actions = [
    ...(extraActions || []),
    ...(onEdit ? [<EditOutlined key="edit" onClick={onEdit} />] : []),
    ...(onDelete ? [<DeleteOutlined key="delete" onClick={onDelete} />] : []),
  ];

  return (
    <Card
      title={
        <span style={{ color: "white", display: "flex", alignItems: "center", gap: 8 }}>
          {icon}
          {title}
        </span>
      }
      style={{
        background: backgroundColor,
        color: "white",
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
      }}
      actions={actions}
    >
      <Text style={{ color: "#ccc" }}>{children}</Text>
    </Card>
  );
};
