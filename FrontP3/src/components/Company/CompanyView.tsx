import { ArrowLeftOutlined, BankOutlined, GlobalOutlined, PhoneOutlined } from "@ant-design/icons";
import { Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { userService } from "../../services/UserService";
import toast from "react-hot-toast";
import type { IUser } from "../../types/types";
import { CompanyChallenges } from "./CompanyChallenges";
import { Link } from "react-router-dom";
import { ChallengeTable } from "../Challenge/ChallengeTable";

export const CompanyView = () => {
  const [companies, setCompanies] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"companies" | "challenges">("companies");

  // Estado para modal
  const [selectedCompany, setSelectedCompany] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const data = await userService.getAllByRole("empresa");
        setCompanies(data);
      } catch (error) {
        toast.error("Error al cargar las empresas");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const openModal = (company: IUser) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  if (view === "companies") {
    return (
      <>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Space wrap size="large">
            {companies.map((company) => (
              <Paper
                key={company._id}
                elevation={3}
                onClick={() => openModal(company)}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  width: 280,
                  cursor: "pointer",
                  transition: "0.2s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.2)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box display="flex" gap={1} alignItems="center">
                  <BankOutlined />
                  {company.nombreEmpresa}
                </Box>
              </Paper>
            ))}
          </Space>
        )}

        {/* MODAL DETALLES */}
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          styles={{
            header: {
              background: "#0b1a2e",
              color: "white",
              borderBottom: "1px solid #1677ff"
            },
            body: {
              background: "#0d1117",
              color: "white",
              padding: "24px"
            },
            content: {
              background: "#0d1117",
              borderRadius: "12px",
              border: "1px solid #1677ff",
              boxShadow: "0 0 12px rgba(22, 119, 255, 0.4)"
            }
          }}
        >
          {selectedCompany && (
            <>
              <h2 style={{ color: "#69b1ff" }}>
                {selectedCompany?.nombreEmpresa}
              </h2>

              <p style={{ color: "#c9d1d9" }}>
                {selectedCompany?.descripcion}
              </p>

              <p style={{ color: "#69b1ff", marginTop: 12 }}>
                <GlobalOutlined />{" "}
                <a
                  href={selectedCompany?.sitioWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#69b1ff" }}
                >
                  {selectedCompany?.sitioWeb}
                </a>
              </p>

              <p style={{ color: "#69b1ff" }}>
                <PhoneOutlined /> {selectedCompany?.telefono}
              </p>

              <Link
                to=""
                style={{ color: "inherit", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                <h3
                  style={{ color: "#69b1ff", marginTop: 20, cursor: "pointer" }}
                  onClick={() => {
                    setView("challenges");

                  }}
                >
                  Desafíos:
                </h3>
              </Link>

              <CompanyChallenges empresaId={selectedCompany._id} />
            </>
          )}
        </Modal>

      </>
    );
  };
  if (view === "challenges" && selectedCompany) {
    return (
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20, gap: 12 }}>
          <div onClick={() => setView("companies")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6, }}>
            <ArrowLeftOutlined style={{ fontSize: 18, color: "white" }} />
            <span style={{ color: "white" }}>Volver</span>
          </div>

          <span style={{ color: "white", opacity: 0.6 }}>{">"}</span>
          <span style={{ color: "white", fontSize: 18 }}>{selectedCompany.nombreEmpresa}</span>
        </div>

        <ChallengeTable empresaId={selectedCompany._id} />
      </div>
    );
  }

};
