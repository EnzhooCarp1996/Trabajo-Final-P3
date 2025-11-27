
export const getStatusStyles = (estado: string) => {
  switch (estado) {
    case "activo":
      return {
        background: "rgba(52, 199, 89, 0.15)",   // verde iOS suave
        color: "#34C759",
        borderColor: "#34C759"
      };
    case "finalizado":
      return {
        background: "rgba(0, 122, 255, 0.15)",   // azul iOS suave
        color: "#007AFF",
        borderColor: "#007AFF"
      };
    case "inactivo":
      return {
        background: "rgba(255, 59, 48, 0.15)",   // rojo iOS suave
        color: "#FF3B30",
        borderColor: "#FF3B30"
      };
    default:
      return {
        background: "rgba(142,142,147,0.15)",
        color: "#8E8E93",
        borderColor: "#8E8E93"
      };
  }
};
