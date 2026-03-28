import { Mail } from "lucide-react";
import CustomSelect from "./CustomSelect";
import type { Skill } from "../types/agent";

interface Props {
  data?: { skills: Skill[] };
  id: string;
  value: string;
  onChange: (value: string) => void;

  onAdd: (id: string) => void;
  activeSkillSelect: string | null;
  setActiveSkillSelect: (id: string | null) => void;
}

export default function SkillSelect({
  id,
  data,
  value,
  onAdd,
  activeSkillSelect,
  setActiveSkillSelect,
}: Props) {
  return (
    <CustomSelect
      id={id}
      label="SKILLS"
      value={value}
      onChange={onAdd}
      icon={<Mail size={18} className="text-blue-400" />}
      options={
        data?.skills.map((s) => ({
          id: s.id,
          name: s.name,
        })) || []
      }
      activeSelect={activeSkillSelect}
      setActiveSelect={setActiveSkillSelect}
    />
  );
}