import { authFBConfig } from "../../../../../config/config";
import { UserDataUpdate } from "../../../../../types/UserSettingsTypes";

type AccountDetailsProps = {
  fetchedDatas: UserDataUpdate;
};

const AccountDetails: React.FC<AccountDetailsProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center py-7 pb-4 bg-whatsapp-panel">
      <div className="relative group cursor-pointer w-[200px] h-[200px] rounded-full overflow-hidden mb-4">
        <img
          src={
            authFBConfig.currentUser?.photoURL ??
            "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
          }
          alt="Profile"
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(32,44,51,0.65)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-white text-xs uppercase tracking-wider text-center px-4 font-normal">
            Change
            <br />
            Profile Photo
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
