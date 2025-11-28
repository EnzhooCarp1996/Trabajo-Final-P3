
export const getStatusStyles = (estado: string) => {
  switch (estado) {
    case "activo":
      return {
        background: "#52c41a",   // verde iOS suave
        color: "#34C759",
        borderColor: "#34C759"
      };
    case "finalizado":
      return {
        background: "#1677ff",   // azul iOS suave
        color: "#007AFF",
        borderColor: "#007AFF"
      };
    case "inactivo":
      return {
        background: "red",   // rojo iOS suave
        color: "#FF3B30",
        borderColor: "#FF3B30"
      };
    default:
      return {
        background: "grey",
        color: "#8E8E93",
        borderColor: "#8E8E93"
      };
  }
};
