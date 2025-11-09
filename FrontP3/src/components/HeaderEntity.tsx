import { PlusOutlined } from "@ant-design/icons";
import { ButtonNuevo } from "./ButtonNuevo";
import { Typography } from "antd";

const { Title } = Typography;

interface HeaderEntityProps {
  titulo: string;
  onClick?: () => void;
  readOnly?: boolean
}

export const HeaderEntity: React.FC<HeaderEntityProps> = ({
  titulo,
  onClick,
  readOnly = false,
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

      {!readOnly && (
        <ButtonNuevo
          title="Nuevo"
          onClick={onClick}
          icon={<PlusOutlined />}
        />
      )}

    </div>
  );
};


