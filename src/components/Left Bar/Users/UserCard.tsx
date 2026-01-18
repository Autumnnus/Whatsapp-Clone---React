/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useDispatch } from "react-redux";
import { authFBConfig } from "../../../config/config";
import { newChatID } from "../../../redux/messageSlice";

type UserCardProps = {
  name: string;
  photo: string;
  id: string;
  status: string;
};

const UserCard: React.FC<UserCardProps> = ({ id, name, photo, status }) => {
  const dispatch = useDispatch();
  const cardSubmit = () => {
    const currentUid = authFBConfig.currentUser?.uid;
    if (currentUid) {
      dispatch(newChatID([id, currentUid]));
    }
  };
  return (
    <div className="w-full">
      <div
        className="flex items-center px-[13px] h-[72px] bg-whatsapp-panel hover:bg-[#2a3942] cursor-pointer transition-colors group"
        onClick={cardSubmit}
      >
        <div className="w-[49px] h-[49px] rounded-full overflow-hidden shrink-0 mr-[15px]">
          <img
            src={
              photo ||
              "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
            }
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center h-full border-b border-whatsapp-border group-hover:border-transparent py-3 pr-2">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-whatsapp-primary text-[17px] font-normal">
              {name}
            </h3>
            <span className="text-xs text-whatsapp-secondary">Yesterday</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[14px] text-whatsapp-secondary truncate max-w-[200px]">
              {status || "Hey there! I am using WhatsApp."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
