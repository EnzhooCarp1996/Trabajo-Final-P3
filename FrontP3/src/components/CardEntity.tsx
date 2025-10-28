import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import { ButtonNuevo } from "./ButtonNuevo";

const { Text } = Typography;

interface CardEntityProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  borderColor?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  extraActions?: React.ReactNode[];
  backgroundColor?: string;
  readOnly?: boolean
  showButtonNew?: boolean;
  onNuevoClick?: () => void;
}

export const CardEntity: React.FC<CardEntityProps> = ({
  title,
  icon,
  children,
  borderColor = "rgba(255,255,255,0.15)",
  onEdit,
  onDelete,
  extraActions = [],
  backgroundColor = "rgba(255,255,255,0.1)",
  readOnly = false,
  showButtonNew = false,
  onNuevoClick,
}) => {
  const actions = readOnly
    ? []
    : [
      ...(extraActions || []),
      ...(onEdit ? [<EditOutlined key="edit" onClick={onEdit} />] : []),
      ...(onDelete ? [<DeleteOutlined key="delete" onClick={onDelete} />] : []),
    ];

  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "white", display: "flex", alignItems: "center", gap: 8 }}>
            {icon}
            {title}
          </span>
          {showButtonNew && (
            <ButtonNuevo
              title="Propuesta"
              onClick={onNuevoClick}
            />
          )}
        </div>
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
