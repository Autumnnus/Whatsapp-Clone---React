const SearchInput = () => {
  return (
    <div className="flex items-center">
      <div className="w-full bg-whatsapp-input rounded-lg flex items-center px-4 py-1.5">
        {/* Include a search icon if possible, but for now just the input */}
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full bg-transparent text-sm text-whatsapp-primary placeholder-whatsapp-secondary focus:outline-none"
          disabled
        />
      </div>
    </div>
  );
};

export default SearchInput;
