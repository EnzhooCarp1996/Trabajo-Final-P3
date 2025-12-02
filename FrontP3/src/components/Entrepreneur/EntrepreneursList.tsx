import type { IUser } from "../../types/types"
import { Card } from "antd"

interface EntrepreneursListProps {
    entrepreneur: IUser;
    openModal: (entrepreneur: IUser) => void;
}

export const EntrepreneursList: React.FC<EntrepreneursListProps> = ({ entrepreneur, openModal }) => {
    return (
        <Card
            key={entrepreneur._id}
            hoverable
            onClick={() => openModal(entrepreneur)}
            style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "white",
                border: `1px solid rgba(255,255,255,0.2)`,
                borderRadius: 12,
                cursor: "pointer",
                width: 280,
                minHeight: 120,
            }}
            styles={{ body: { padding: "16px" } }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Nombre */}
                <div>
                    <div style={{ color: "white", fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
                        {entrepreneur.nombreCompleto}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginBottom: 4 }}>
                        {entrepreneur.email}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>

                    </div>
                </div>

                {/* Separador */}
                <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.2)", margin: "8px 0" }}></div>
            </div>
        </Card>
    )
}