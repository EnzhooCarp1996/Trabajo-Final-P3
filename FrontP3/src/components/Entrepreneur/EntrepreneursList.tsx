import { ExportOutlined, FileTextOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../../types/types"
import { Box, Paper } from "@mui/material";

interface EntrepreneursListProps {
    entrepreneur: IUser;
}

export const EntrepreneursList: React.FC<EntrepreneursListProps> = ({ entrepreneur }) => {
    const navigate = useNavigate();
    return (
        <Paper
            elevation={24}
            sx={{
                p: 2,
                borderRadius: 3,
                background: "rgba(255,255,255,0.1)",
                color: "white",
                width: 280,
                transition: "0.2s ease",
                "&:hover": {
                    background: "rgba(255,255,255,0.2)", transform: "scale(1.02)",
                },
            }}
        >
            <Box display="flex" gap={1} alignItems="center">
                <UserOutlined />
                {entrepreneur.nombreCompleto}
                <div onClick={() => navigate(`/perfil/${entrepreneur._id}`)} style={{ cursor: "pointer", color: "#69b1ff", }} >
                    <ExportOutlined style={{ fontSize: 15 }} />
                </div>
            </Box>
            <Box display="flex" gap={1} alignItems="center">
                <MailOutlined />
                <a target="_blank" rel="noopener noreferrer" style={{ color: "#69b1ff" }} >
                    {entrepreneur.email}
                </a>
            </Box>
            <Box display="flex" gap={1} alignItems="center">
                <FileTextOutlined />
                Cant. propuestas: {entrepreneur.proposalCount}
            </Box>
        </Paper>
    )
}