import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import { ButtonNuevo } from "./ButtonNuevo";
import type { CSSProperties, ReactNode } from "react";

const { Text } = Typography;

interface CardEntityProps {
  tituloBoton?: string;
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  borderColor?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  extraActions?: ReactNode[];
  backgroundColor?: string;
  readOnly?: boolean
  showButtonNew?: boolean;
  onNuevoClick?: () => void;
  iconoBoton?: ReactNode
  styles?: CSSProperties;
}

export const CardEntity: React.FC<CardEntityProps> = ({
  tituloBoton,
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
  iconoBoton,
  styles
}) => {
  const actions = readOnly
    ? []
    : [
      ...(extraActions || []),
      ...(onEdit ? [<EditOutlined key="edit" onClick={onEdit} />] : []),
      ...(onDelete ? [<DeleteOutlined key="delete" onClick={onDelete} style={{ color: "#d10b0bff", }} />] : []),
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
            <ButtonNuevo title={tituloBoton} onClick={onNuevoClick} icon={iconoBoton} />
          )}
        </div>
      }
      style={{ background: backgroundColor, color: "white", border: `1px solid ${borderColor}`, borderRadius: 12, ...styles }}
      actions={actions}
    >
      <Text style={{ color: "#ccc" }}>{children}</Text>
    </Card>
  );
};
