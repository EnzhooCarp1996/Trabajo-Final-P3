import { BrowserRouter } from "react-router-dom";
import { MainContent } from "./MainContent";
import { Sidebar } from "./Sidebar";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { useState } from "react";

const drawerWidth = 240;

export const AppContent = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        {/* Header */}
        <Header toggleDrawer={toggleDrawer} />

        {/* Drawer / Sidebar */}
        <Sidebar open={open} drawerWidth={drawerWidth} />

        {/* MainContent */}
        <MainContent open={open} drawerWidth={drawerWidth} />

      </Box>
    </BrowserRouter>
  );
};

