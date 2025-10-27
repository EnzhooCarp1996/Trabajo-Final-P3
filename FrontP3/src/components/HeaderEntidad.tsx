import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

const { Title } = Typography;

interface HeaderEntidadProps {
  titulo: string;
  texto: string;
  onClick: () => void;
}

export const HeaderEntidad: React.FC<HeaderEntidadProps> = ({
  titulo,
  texto,
  onClick,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
      }}
    >
      <Title level={3} style={{ color: "white", margin: 0 }}>
        {titulo}
      </Title>

      <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={onClick}
      style={{
        backgroundColor: "#1677ff",
        borderRadius: 8,
        height: 40,
      }}
    >
      {texto}
    </Button>
    </div>
  );
};


