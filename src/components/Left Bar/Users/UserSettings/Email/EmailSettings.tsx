import { authFBConfig } from "../../../../../config/config";

type EmailSettingsProps = {
  onchangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataUpdate: {
    email?: string;
  };
  setVerifyEmailModal: (isOpen: boolean) => void;
};

const EmailSettings: React.FC<EmailSettingsProps> = ({
  onchangeFunc,
  dataUpdate,
  setVerifyEmailModal,
}) => {
  const openVerifyEmailModal = (e: any) => {
    e.preventDefault();
    setVerifyEmailModal(true);
  };
  return (
    <div className="flex items-center space-x-2">
      {authFBConfig.currentUser?.emailVerified ? (
        <div className="flex items-center justify-between w-full">
          <label>Email:</label>
          <input
            type="email"
            className=" rounded-lg"
            onChange={(e) => onchangeFunc(e)}
            id="email"
            name="email"
            value={dataUpdate.email}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <label>Email:</label>
          <button
            className="bg-blue-500 text-white p-1 rounded-lg ml-auto"
            onClick={openVerifyEmailModal}
          >
            Verify Email
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailSettings;
