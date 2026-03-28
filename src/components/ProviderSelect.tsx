import { Cpu } from "lucide-react";
import CustomSelect from "./CustomSelect";

interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;

  activeSelect: string | null;
  setActiveSelect: (id: string | null) => void;
}

export default function ProviderSelect({
  id,
  value,
  onChange,
  activeSelect,
  setActiveSelect,
}: Props) {
  const providers = ["Gemini", "ChatGPT", "Claude", "DeepSeek"];

  return (
    <CustomSelect
      id={id}
      label="PROVIDER"
      value={value}
      onChange={onChange}
      icon={<Cpu size={18} className="text-blue-400" />}
      options={providers.map((p) => ({
        id: p,
        name: p,
      }))}
      activeSelect={activeSelect}
      setActiveSelect={setActiveSelect}
    />
  );
}