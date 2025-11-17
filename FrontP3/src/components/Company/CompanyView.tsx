import { BankOutlined, GlobalOutlined, PhoneOutlined } from "@ant-design/icons";
import { HeaderEntity } from "../HeaderEntity";
import { Space } from "antd";
import { useEffect, useState } from "react";
import type { IUser } from "../../types/types";

import { Box, Paper } from "@mui/material";
import { userService } from "../../services/UserService";
import toast from "react-hot-toast";

export const CompanyView = () => {
  const [companies, setCompanies] = useState<IUser[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const data = await userService.getAllByRole("empresa");
        setCompanies(data);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar las empresas");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <>
      <HeaderEntity titulo="Empresas" />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Space wrap size="large">
          {companies.map((company) => (
            <Paper
              key={company._id}
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 3,
                background: "rgba(255,255,255,0.1)",
                color: "white",
                width: 280,
                cursor: "pointer",
                transition: "0.3s ease",
              }}
              onMouseEnter={() => setHoveredId(company._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Nombre siempre visible */}
              <Box display="flex" gap={1} alignItems="center">
                <BankOutlined />
                {company.nombreEmpresa}
              </Box>

              {/* Contenido oculto/expandido */}
              <Box
                sx={{
                  maxHeight: hoveredId === company._id ? 500 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                  mt: hoveredId === company._id ? 2 : 0,
                }}
              >
                <Box color="#ccc">
                  {company.descripcion}

                  <div style={{ marginTop: 12 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: "#91caff",
                      }}
                    >
                      <GlobalOutlined />{" "}
                      <a
                        href={company.sitioWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#91caff" }}
                      >
                        {company.sitioWeb}
                      </a>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: "#91caff",
                      }}
                    >
                      <PhoneOutlined /> {company.telefono}
                    </div>
                  </div>
                </Box>
              </Box>
            </Paper>
          ))}
        </Space>
      )}
    </>
  );
};
