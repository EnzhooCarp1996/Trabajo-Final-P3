import { getStatusStyles } from "../../../utils/utilsChallenges";
import type { ChallengeStatus } from "../../../types/types";
import { Select } from "antd";

export const StatusSelect = ({ estado, onChange }: { estado: string, onChange: any }) => {
  const styles = getStatusStyles(estado);

  return (
    <Select
      value={estado}
      onChange={(v) => onChange(v as ChallengeStatus)}
      options={[
        { value: "activo", label: "Activo" },
        { value: "finalizado", label: "Finalizado" },
        { value: "inactivo", label: "Inactivo" }
      ]}
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
