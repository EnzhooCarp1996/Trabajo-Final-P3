import { Tabs } from "antd";

interface EstadoTabsProps {
  items: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export const EstadoTabs: React.FC<EstadoTabsProps> = ({ items, onChange }) => {
  return (
    <Tabs
      defaultActiveKey={items[0].value}
      onChange={(key) => onChange(key)}
      centered
      items={items.map((item) => ({
        key: item.value,
        label: (
          <span style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            {item.label}
          </span>
        ),
        children: null, // <--- esto evita el contenido abajo
      }))}
      tabBarStyle={{
        background: "black",
        padding: 10,
        borderRadius: 12,
      }}
    />
  );
};
