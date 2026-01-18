// import { BsThreeDotsVertical } from "react-icons/bs";
// import { GoSearch } from "react-icons/go";
import { DocumentData } from "@firebase/firestore";
import { useSelector } from "react-redux";
import { MessageSliceStateSelector } from "../../types/MessageTypes";

type RightHeaderProps = {
  users: { id: string; data: DocumentData }[];
  setUserInfoModalOpen: (isOpen: boolean) => void;
};

const RightHeader: React.FC<RightHeaderProps> = ({
  users,
  setUserInfoModalOpen,
}) => {
  const receiver = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.receiver,
  );
  const receiverData = users.find((user) => user.id === receiver);

  return (
    <div className="h-[59px] bg-whatsapp-header w-full flex items-center px-4 justify-between shrink-0 border-l border-[#313d45] z-30">
      <div
        className="flex items-center cursor-pointer flex-1"
        onClick={() => setUserInfoModalOpen(true)}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img
            src={
              receiverData?.data.photo ||
              "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
            }
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-whatsapp-primary text-base font-normal leading-tight">
            {receiverData?.data.name}
          </h2>
          <span className="text-[12px] text-whatsapp-secondary leading-tight mt-0.5">
            click here for info
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-[#aebac1]">
        <button className="p-2 rounded-full hover:bg-[#3c454c] transition-colors">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            className="fill-current"
          >
            <path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.5 1.6-4.1 0-3.5-2.8-6.3-6.3-6.3S3.7 6.4 3.7 9.9s2.8 6.3 6.3 6.3c1.6 0 3-.6 4.1-1.6l.3.3v.9l6.1 6.1 1.8-1.8-6.1-6.1zm-5.9 0c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4z"></path>
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-[#3c454c] transition-colors">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            className="fill-current"
          >
            <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RightHeader;
