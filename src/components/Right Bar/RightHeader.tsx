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
  console.log(receiverData);

  const openModal = () => {
    setUserInfoModalOpen(true);
  };
  console.log(users);
  return (
    <div className="h-[59px] bg-whatsapp-header w-full flex items-center px-4 justify-between shrink-0 border-l border-whatsapp-border z-20">
      <div className="flex justify-between items-center w-full">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={openModal}
        >
          <img
            src={
              receiverData?.data.photo ||
              "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
            }
            alt=""
            className="w-10 h-10 object-cover rounded-full"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-whatsapp-primary text-base font-normal leading-tight">
              {receiverData?.data.name}
            </h2>
            <p className="text-xs text-whatsapp-secondary leading-tight mt-0.5">
              click here for info
            </p>
          </div>
        </div>

        {/* <div className="space-x-4 flex items-center px-1 text-whatsapp-secondary">
           <GoSearch className="cursor-pointer" size={24}></GoSearch>
           <BsThreeDotsVertical className="cursor-pointer" size={24}></BsThreeDotsVertical>
        </div> */}
      </div>
    </div>
  );
};

export default RightHeader;
