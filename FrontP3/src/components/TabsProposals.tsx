import { Tabs } from "antd";

interface TabsProposalsProps {
  items: { label: string; value: string }[];
  activeKey: string;
  onChange: (value: string) => void;
}

export const TabsProposals: React.FC<TabsProposalsProps> = ({ items, activeKey, onChange }) => {
  return (
    <Tabs
      activeKey={activeKey}
      onChange={(key) => onChange(key)}
      centered
      items={items.map((item) => ({
        key: item.value,
        label: (
          <span style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            {item.label}
          </span>
        ),
        children: null,
      }))}
      tabBarStyle={{
        background: "black",
        padding: 10,
        borderRadius: 12,
      }}
    />
  );
};
