/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { authFBConfig } from "../../../config/config";

type newChatMessageProps = {
  msg: {
    id?: string;
    userId?: string;
    room?: string;
    text?: string;
    user?: string;
    createdAt?: string;
  };
};

const ChatMessage: React.FC<newChatMessageProps> = ({ msg }) => {
  const user = authFBConfig.currentUser?.uid;
  if (!msg.createdAt) {
    return null;
  }
  const milliseconds = // @ts-ignore
    msg.createdAt.seconds * 1000 + msg.createdAt.nanoseconds / 1000000;
  const date = new Date(milliseconds);
  // const year = date.getFullYear();
  // const month = date.toLocaleString("default", { month: "short" });
  // const day = date.getDate();
  const hour = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      {user === msg.userId ? (
        <div className="flex justify-end mb-2">
          <div className="bg-whatsapp-outgoing text-whatsapp-primary px-2 pt-1.5 pb-1 rounded-lg rounded-tr-none max-w-[65%] shadow-sm relative break-words text-sm">
            <p className="mr-8 leading-relaxed px-1">{msg.text}</p>
            <span className="text-[10px] text-[hsla(0,0%,100%,0.6)] absolute bottom-1 right-2 w-fit">
              {hour}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex justify-start mb-2">
          <div className="bg-whatsapp-incoming text-whatsapp-primary px-2 pt-1.5 pb-1 rounded-lg rounded-tl-none max-w-[65%] shadow-sm relative break-words text-sm">
            <p className="mr-8 leading-relaxed px-1">{msg.text}</p>
            <span className="text-[10px] text-[hsla(0,0%,100%,0.6)] absolute bottom-1 right-2 w-fit">
              {hour}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
