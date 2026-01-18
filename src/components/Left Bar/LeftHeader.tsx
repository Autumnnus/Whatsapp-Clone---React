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
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={
                  authFBConfig.currentUser?.photoURL ||
                  "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[#aebac1]">
            <button
              onClick={() => setToggleMessageUserBar(true)}
              className="p-2 rounded-full hover:bg-[#3c454c] transition-colors"
              title="Chats"
            >
              <BsChatLeftTextFill size={19} />
            </button>
            <button
              onClick={() => setToggleMessageUserBar(false)}
              className="p-2 rounded-full hover:bg-[#3c454c] transition-colors"
              title="Contacts"
            >
              <HiUsers size={22} />
            </button>
            <button
              onClick={() => setUserSettingsModalOpen(true)}
              className="p-2 rounded-full hover:bg-[#3c454c] transition-colors"
              title="Settings"
            >
              <IoMdSettings size={22} />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-[#3c454c] transition-colors text-red-400"
              title="Logout"
            >
              <GoSignOut size={22} />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-full">
          <h1 className="text-whatsapp-teal font-semibold tracking-[2px] text-sm italic">
            WHATSAPP
          </h1>
        </div>
      )}
    </div>
  );
};

export default LeftHeader;
