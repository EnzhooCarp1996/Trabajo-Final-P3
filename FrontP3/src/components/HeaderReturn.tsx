import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface HeaderReturnProps {
    titulo?: string;
}

export const HeaderReturn: React.FC<HeaderReturnProps> = ({ titulo }) => {
    const navigate = useNavigate();
    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16, gap: 12 }}>
            <div onClick={() => navigate(-1)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6, }}>
                <ArrowLeftOutlined style={{ fontSize: 18, color: "white" }} />
                <span style={{ color: "white" }}>Volver</span>
            </div>

            <span style={{ color: "white", opacity: 0.6 }}>{">"}</span>
            <span style={{ color: "white", fontSize: 18 }}>{titulo}</span>
        </div>
    )
}