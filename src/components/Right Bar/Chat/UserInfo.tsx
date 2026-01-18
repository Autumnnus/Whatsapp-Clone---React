import { DocumentData } from "@firebase/firestore";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { MessageSliceStateSelector } from "../../../types/MessageTypes";

type UserInfoProps = {
  users: { id: string; data: DocumentData }[];
  setUserInfoModalOpen: (isOpen: boolean) => void;
  userInfoModalOpen: boolean;
};

const UserInfo: React.FC<UserInfoProps> = ({
  setUserInfoModalOpen,
  userInfoModalOpen,
  users,
}) => {
  const receiver = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.receiver,
  );
  const receiverData = users.find((user) => user.id === receiver);
  const closeModal = () => {
    setUserInfoModalOpen(false);
  };

  return (
    <>
      {userInfoModalOpen && (
        <div className="absolute top-0 right-0 h-full w-[350px] bg-whatsapp-dark border-l border-whatsapp-border z-30 flex flex-col transition-all duration-300 shadow-xl">
          <div className="h-[60px] bg-whatsapp-header flex items-center px-6 shrink-0">
            <div
              className="flex items-center text-whatsapp-primary cursor-pointer gap-4"
              onClick={closeModal}
            >
              <AiFillCloseCircle
                size={24}
                className="text-whatsapp-secondary hover:text-whatsapp-primary transition-colors"
              />
              <span className="font-medium">Contact Info</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="bg-whatsapp-panel flex flex-col items-center py-8 mb-3 shadow-sm">
              <img
                src={
                  receiverData?.data.photo ||
                  "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                }
                alt="Profile"
                className="w-[200px] h-[200px] rounded-full object-cover mb-4"
              />
              <h2 className="text-whatsapp-primary text-2xl font-normal mb-1">
                {receiverData?.data.name}
              </h2>
              <p className="text-whatsapp-secondary text-lg text-center px-4">
                {receiverData?.data.status}
              </p>
            </div>

            <div className="bg-whatsapp-panel p-4 shadow-sm mb-3">
              <h3 className="text-whatsapp-teal text-sm mb-2">About</h3>
              <p className="text-whatsapp-primary">
                {receiverData?.data.status || "Hey there! I am using WhatsApp."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
