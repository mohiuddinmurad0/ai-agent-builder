import { Headphones } from "lucide-react";
import CustomSelect from "./CustomSelect";
import type { AgentProfile } from "../types/agent";

interface Props {
  id: string;
  data?: { agentProfiles: AgentProfile[] };
  value: string;
  onChange: (value: string) => void;

  activeSelect: string | null;
  setActiveSelect: (id: string | null) => void;
}

export default function ProfileSelect({
  id,
  data,
  value,
  onChange,
  activeSelect,
  setActiveSelect,
}: Props) {
  return (
    <CustomSelect
      id={id}
      label="AGENT PROFILE"
      value={value}
      onChange={onChange}
      icon={<Headphones size={18} className="text-blue-400" />}
      options={
        data?.agentProfiles.map((p) => ({
          id: p.id,
          name: p.name,
        })) || []
      }
      activeSelect={activeSelect}
      setActiveSelect={setActiveSelect}
    />
  );
}