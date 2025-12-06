import { estadochallenges, getStatusColorChallenges, getStatusStylesChallenges } from "../../../utils/utilsChallenges";
import { estadoPropuestas, getStatusColorProposals, getStatusStylesProposals } from "../../../utils/utilsProposals";
import { Select } from "antd";

export const StatusSelect = ({ isChallenge, estado, onChange }: { isChallenge?: boolean, estado: string, onChange: any }) => {
  const styles = isChallenge ? getStatusStylesChallenges(estado) : getStatusStylesProposals(estado);
  const estadoOptions = isChallenge ? estadochallenges : estadoPropuestas;
  const statusColor = isChallenge ? getStatusColorChallenges : getStatusColorProposals;
  return (
    <Select
      value={estado}
      onChange={onChange}
      options={estadoOptions.map(opt => ({
        value: opt.value,
        label: (
          <span style={{ color: statusColor(opt.value), fontWeight: 600 }}>
            {opt.label}
          </span>
        )
      }))}
      style={{
        width: 150,
        borderRadius: 999,
        padding: 8,
        height: 40,
        textAlign: "center",
        ...styles,
        borderWidth: 1.5,
      }}
      dropdownStyle={{
        borderRadius: 12,
        padding: 4
      }}
    />
  );
};
