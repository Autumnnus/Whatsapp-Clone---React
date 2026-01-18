import { BiSearchAlt2 } from "react-icons/bi";

const SearchInput = () => {
  return (
    <div className="flex items-center px-4 py-2 bg-whatsapp-panel">
      <div className="w-full bg-[#202c33] rounded-lg flex items-center px-3 py-1.5 focus-within:bg-[#323739] transition-colors">
        <BiSearchAlt2 size={18} className="text-whatsapp-secondary mr-6 ml-2" />
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full bg-transparent text-[14px] text-whatsapp-primary placeholder:text-[#8696a0] focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchInput;
