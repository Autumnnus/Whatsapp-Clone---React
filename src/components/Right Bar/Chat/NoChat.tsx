const NoChat = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full border-b-[6px] border-[#00a884]">
      <div className="flex flex-col items-center text-center px-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp Web"
          className="w-[100px] h-[100px] mb-8 opacity-40 grayscale"
        />
        <h1 className="text-[#e9edef] text-[32px] font-light mb-4">
          WhatsApp Web
        </h1>
        <p className="text-[#8696a0] text-sm leading-6">
          Send and receive messages without keeping your phone online.
          <br />
          Use WhatsApp on up to 4 linked devices and 1 phone.
        </p>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center">
        <p className="text-[#667781] text-xs flex items-center gap-1">
          <span className="text-[10px]">🔒</span> End-to-end encrypted
        </p>
      </div>
    </div>
  );
};

export default NoChat;
