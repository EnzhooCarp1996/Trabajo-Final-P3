import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";
import type { ReactNode } from "react";
import { useState as useReactState } from "react";

const { Text } = Typography;

interface CardProposalByIdProps {
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  borderColor: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const CardProposalById: React.FC<CardProposalByIdProps> = ({
  title,
  icon,
  children,
  borderColor,
  onEdit,
  onDelete,
}) => {
  const [hover, setHover] = useReactState(false);

  const actions = [
    <EditOutlined key="edit" onClick={onEdit} />,
    <DeleteOutlined key="delete" onClick={onDelete} style={{ color: "#d10b0bff" }} />,
  ];

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            {icon}
            {title}
          </span>
        </div>
      }
      style={{
        background: "rgba(255,255,255,0.1)",
        color: "white",
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        transition: "0.3s ease",
        cursor: "pointer",
        padding: 0
      }}
      actions={actions}
      styles={{
        body: {
        padding: hover ? "16px" : "0px",
        transition: "padding 0.3s ease"
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          maxHeight: hover ? "600px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <Text style={{ color: "#ccc" }}>{children}</Text>
      </div>
    </Card>
  );
};
