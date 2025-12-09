import { getStatusColorProposals } from '../utils/utilsProposals'
import { Tabs } from 'antd'

interface TabsProposalsProps {
  items: { label: string; value: string }[]
  activeKey: string
  onChange: (value: string) => void
}

export const TabsProposals: React.FC<TabsProposalsProps> = ({ items, activeKey, onChange }) => {
  return (
    <>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => onChange(key)}
        centered
        items={items.map((item) => ({
          key: item.value,
          label: (
            <span
              style={{
                color: getStatusColorProposals(item.value),
                fontWeight: 'bold',
                fontSize: 'clamp(12px, 3vw, 18px)',
              }}
            >
              {item.label}
            </span>
          ),
          children: null,
        }))}
        tabBarStyle={{
          background: 'black',
          padding: 10,
          borderRadius: 12,
        }}
      />
      <style>
        {`
          .ant-tabs-ink-bar {
            background: ${getStatusColorProposals(activeKey)} !important;
            height: 4px !important;
          }
       `}
      </style>
    </>
  )
}
