import { signOut } from "firebase/auth";
import { BsChatLeftTextFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { HiUsers } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authFBConfig } from "../../config/config";
import { loginModeToggle, tokenInfo } from "../../redux/userSlice";
import { UserSliceStateSelector } from "../../types/UserTypes";

type LeftHeaderProps = {
  setToggleMessageUserBar: (chatMode: boolean) => void;
  setUserSettingsModalOpen: (isOpen: boolean) => void;
};

const LeftHeader: React.FC<LeftHeaderProps> = ({
  setToggleMessageUserBar,
  setUserSettingsModalOpen,
}) => {
  const token = useSelector(
    (state: UserSliceStateSelector) => state.userStore.token,
  );
  const auth = authFBConfig;
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (token) {
      signOut(auth)
        .then(() => {
          console.log("Signed out successfully");
        })
        .catch((error) => {
          console.error(error);
        });
      dispatch(tokenInfo(""));
      dispatch(loginModeToggle(false));
      auth.onAuthStateChanged((user) => {
        if (user) {
          localStorage.removeItem("user");
        }
      });
    } else {
      console.error("User is not authenticated. Cannot sign out.");
    }
  };

  return (
    <div className="h-[59px] bg-whatsapp-header w-full flex items-center px-4 justify-between shrink-0 border-r border-[#313d45]">
      {token ? (
        <div className="flex justify-between items-center w-full">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setUserSettingsModalOpen(true)}
          >
            <img
              src={
                authFBConfig.currentUser?.photoURL ||
                "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
              }
              alt="Profile"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <div className="flex items-center space-x-5 text-[#aebac1]">
            <BsChatLeftTextFill
              size={20}
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => setToggleMessageUserBar(true)}
              title="Chats"
            />
            <HiUsers
              size={22}
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => setToggleMessageUserBar(false)}
              title="Contacts"
            />
            <IoMdSettings
              size={22}
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => setUserSettingsModalOpen(true)}
              title="Settings"
            />
            <GoSignOut
              size={22}
              className="cursor-pointer hover:text-white transition-colors"
              onClick={handleLogout}
              title="Logout"
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-full">
          <h1 className="text-whatsapp-secondary font-medium tracking-wide">
            WHATSAPP WEB
          </h1>
        </div>
      )}
    </div>
  );
};

export default LeftHeader;
