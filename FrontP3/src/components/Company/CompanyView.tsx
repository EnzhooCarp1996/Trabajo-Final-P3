import { BankOutlined, GlobalOutlined, PhoneOutlined } from "@ant-design/icons"
import { HeaderEntity } from "../HeaderEntity";
import { storage } from "../../storage";

import { Space } from "antd"
import { useState } from "react";
import type { User } from "../../types/types";

import 'swiper/css';
import { Box, Paper } from "@mui/material";


export const CompanyView = () => {
  const [users] = useState<User[]>(storage.getUsers());
  const companies = users.filter(u => u.role === "empresa");

  // const handleDelete = (id: string) => {
  //   const updated = companies.filter((c) => c.id !== id);
  //   setCompanies(updated);
  //   storage.setCompanies(updated);
  // };

  return (
    <>
      {/* Encabezado */}
      <HeaderEntity titulo="Empresas" readOnly />

      {/* lista de empresas */}
      <Space wrap size="large">
        {companies.filter(u => u.role === "empresa").map((company) => (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, background: "rgba(255,255,255,0.1)", color: "white" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" gap={1} alignItems="center">{<BankOutlined />}
                {company.nombreEmpresa}</Box>
            </Box>

            <Box mt={2} color="#ccc">
              {company.descripcion}
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#91caff" }}>
                  <GlobalOutlined />{" "}
                  <a href={company.sitioWeb} target="_blank" rel="noopener noreferrer" style={{ color: "#91caff" }}>
                    {company.sitioWeb}
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#91caff" }}>
                  <PhoneOutlined /> {company.telefono}
                </div>
              </div>
            </Box>
          </Paper>
        ))}
      </Space>

    </>
  );
}
