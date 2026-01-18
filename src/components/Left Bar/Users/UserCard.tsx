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
    <div
      className="flex items-center px-3 h-[72px] bg-whatsapp-panel hover:bg-[#202c33] cursor-pointer transition-colors group relative"
      onClick={cardSubmit}
    >
      <div className="w-[49px] h-[49px] rounded-full overflow-hidden shrink-0 mr-4">
        <img
          src={
            photo ||
            "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
          }
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center h-full border-b border-[#222d34] group-hover:border-transparent pr-2">
        <div className="flex justify-between items-center">
          <h3 className="text-whatsapp-primary text-[17px] font-normal truncate">
            {name}
          </h3>
          <span className="text-[12px] text-whatsapp-secondary">Yesterday</span>
        </div>
        <div className="flex justify-between items-center mt-0.5">
          <p className="text-[14px] text-whatsapp-secondary truncate max-w-[260px]">
            {status || "Hey there! I am using WhatsApp."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
