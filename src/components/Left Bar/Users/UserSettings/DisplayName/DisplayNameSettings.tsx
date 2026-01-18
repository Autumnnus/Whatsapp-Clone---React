type DisplayNameSettingsProps = {
  onchangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataUpdate: {
    name?: string;
  };
};

const DisplayNameSettings: React.FC<DisplayNameSettingsProps> = ({
  onchangeFunc,
  dataUpdate,
}) => {
  return (
    <div className="flex items-center border-b-2 border-whatsapp-teal pb-1">
      <input
        type="text"
        className="w-full bg-transparent text-whatsapp-primary focus:outline-none text-[17px]"
        onChange={onchangeFunc}
        id="name"
        name="name"
        value={dataUpdate.name}
        placeholder="Your Name"
      />
      <div className="text-whatsapp-secondary">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          className="fill-current"
        >
          <path d="M3.95 16.7v3.4h3.4l9.8-9.8-3.4-3.4-9.8 9.8zm15.8-9.1c.4-.4.4-1 0-1.4l-2.3-2.3c-.4-.4-1-.4-1.4 0l-1.8 1.8 3.4 3.4 2.1-1.5z"></path>
        </svg>
      </div>
    </div>
  );
};

export default DisplayNameSettings;
