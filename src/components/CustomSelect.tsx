import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

interface Option {
  id: string;
  name: string;
}

interface Props {
  id: string;
  label: string;
  value?: string;
  options: Option[];
  onChange: (id: string) => void;
  icon: React.ReactNode;

  activeSelect: string | null;
  setActiveSelect: (id: string | null) => void;
}

export default function CustomSelect({
  id,
  label,
  value,
  options,
  onChange,
  icon,
  activeSelect,
  setActiveSelect,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const open = activeSelect === id;
  const selected = options.find((o) => o.id === value);

  const [style, setStyle] = useState<React.CSSProperties>({});

  // ✅ calculate dropdown position (for portal)
  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();

      setStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [open]);

  // ✅ click outside close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        ref.current &&
        !ref.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setActiveSelect(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setActiveSelect]);

  return (
    <div ref={ref} className="relative w-full">
      <p className="text-xs text-gray-400 mb-2">{label}</p>

      {/* Trigger */}
      <div
        onClick={() =>
          setActiveSelect(open ? null : id)
        }
        className="flex items-center justify-between bg-[#0b1220] border border-gray-700 px-4 py-2 rounded-xl cursor-pointer hover:border-gray-500"
      >
        <div className="flex items-center gap-3">
          <div className="bg-[#1e293b] p-2 rounded-md">
            {icon}
          </div>

          <span className="text-white">
            {selected?.name || "Select"}
          </span>
        </div>

        <ChevronDown
          size={15}
          className={`text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* 🔥 Portal Dropdown */}
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={style}
            className="bg-[#0b1220] border border-gray-700 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((o) => (
                <div
                  key={o.id}
                  onClick={() => {
                    onChange(o.id);
                    setActiveSelect(null);
                  }}
                  className="px-4 py-3 hover:bg-[#1e293b] cursor-pointer text-white"
                >
                  {o.name}
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}