import { userService } from "../../services/UserService";
import { BankOutlined, ExportOutlined, GlobalOutlined, TrophyOutlined } from "@ant-design/icons";
import type { IUser } from "../../types/types";
import { CompanyModal } from "./CompanyModal";
import { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import toast from "react-hot-toast";

export const CompanyView = () => {
  const [companies, setCompanies] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={3}
          width="100%"
        >
          {companies.map((company) => (
            <Paper
              key={company._id}
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
                <BankOutlined />
                {company.nombreEmpresa}
                <div onClick={() => openModal(company)} style={{ cursor: "pointer", color: "#69b1ff", }} >
                  <ExportOutlined style={{ fontSize: 15 }} />
                </div>
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <GlobalOutlined />
                <a href={company.sitioWeb} target="_blank" rel="noopener noreferrer" style={{ color: "#69b1ff" }} >
                  {company.sitioWeb}
                </a>
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <TrophyOutlined />
                Cant. desafios: {company.challengeCount}
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* MODAL DETALLES */}
      {selectedCompany &&
        <CompanyModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          _id={selectedCompany._id}
        />
      }

    </>
  );
};
