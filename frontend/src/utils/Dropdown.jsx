import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function Dropdown({categories = []}) {
    const [selected, setSelected] = useState(categories[0]);
    const [open, setOpen] = useState(false);

    return (
        <div className="relative md:w-48 w-full text-sm text-white">
            {/* Dropdown Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center w-full bg-zinc-800 px-3 py-2 rounded-md border border-zinc-700 hover:bg-zinc-700 transition-all"
            >
                {selected}
                <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                />
            </button>

            {/* Dropdown List */}
            <div
                className={`absolute z-10 mt-2 w-full bg-zinc-900 rounded-md border border-zinc-700 shadow-lg transition-all duration-200 origin-top transform ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                {categories.map((style) => (
                    <button
                        key={style}
                        onClick={() => {
                            setSelected(style);
                            setOpen(false);
                        }}
                        className={`w-full flex justify-between items-center px-4 py-2 text-left transition-colors ${selected === style ? "bg-zinc-800" : "hover:bg-zinc-800"
                            }`}
                    >
                        {style}
                        {selected === style && <Check size={16} />}
                    </button>
                ))}
            </div>
        </div>
    );
}