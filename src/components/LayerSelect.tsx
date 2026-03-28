import { Brain } from "lucide-react";
import CustomSelect from "./CustomSelect";
import type { Layer } from "../types/agent";

interface Props {
  id: string;
  data?: { layers: Layer[] };
  value: string;
  onChange: (id: string) => void;

  activeSelect: string | null;
  setActiveSelect: (id: string | null) => void;
}

export default function LayerSelect({
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
      label="LAYERS"
      value={value}
      onChange={onChange}
      icon={<Brain size={18} className="text-blue-400" />}
      options={
        data?.layers.map((l) => ({
          id: l.id,
          name: l.name,
        })) || []
      }
      activeSelect={activeSelect}
      setActiveSelect={setActiveSelect}
    />
  );
}