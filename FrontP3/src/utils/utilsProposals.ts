export const getStatusColor = (estado: string) => {
    switch (estado) {
      case "seleccionada":
        return "#52c41a";
      case "descartada":
        return "#f5222d";
      default:
        return "#1677ff";
    }
  };

export const estados = [
    { label: "En revisión", value: "en revision" },
    { label: "Seleccionadas", value: "seleccionada" },
    { label: "Descartadas", value: "descartada" },
  ];