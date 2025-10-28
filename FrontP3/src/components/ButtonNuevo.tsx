import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface ButtonNuevoProps {
  title: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const ButtonNuevo: React.FC<ButtonNuevoProps> = ({
  title = "Nuevo",
  onClick,
  style,
}) => {
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={onClick}
      style={{
        backgroundColor: "#1677ff",
        borderRadius: 8,
        height: 32,
        fontSize: 12,
        padding: "0 8px",
        ...style, 
      }}
    >
      {title}
    </Button>
  );
};
