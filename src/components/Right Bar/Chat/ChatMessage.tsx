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
    <div
      className={`flex w-full mb-[2px] ${user === msg.userId ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] lg:max-w-[65%] px-2.5 py-1.5 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] relative text-[14.2px] 
          ${
            user === msg.userId
              ? "bg-[#005c4b] text-[#e9edef] rounded-l-lg rounded-br-lg rounded-tr-[2px] ml-10 mr-1"
              : "bg-[#202c33] text-[#e9edef] rounded-r-lg rounded-bl-lg rounded-tl-[2px] mr-10 ml-1"
          }`}
      >
        {/* Triangle Tail */}
        <div
          className={`absolute top-0 w-3 h-3 
            ${
              user === msg.userId
                ? "right-[-8px] text-[#005c4b]"
                : "left-[-8px] text-[#202c33]"
            }`}
        >
          <svg viewBox="0 0 8 13" width="8" height="13">
            <path
              fill="currentColor"
              d={
                user === msg.userId
                  ? "M0,0 C3,0 8,0 8,0 L8,13 Z"
                  : "M8,0 C5,0 0,0 0,0 L0,13 Z"
              }
            />
          </svg>
        </div>

        <div className="flex flex-col relative">
          <p className="pr-14 break-words leading-[19px] whitespace-pre-wrap">
            {msg.text}
          </p>
          <div className="flex items-center justify-end space-x-1 mt-[-6px] ml-auto">
            <span className="text-[11px] text-[#8696a0] select-none">
              {hour}
            </span>
            {user === msg.userId && (
              <svg
                viewBox="0 0 16 11"
                width="16"
                height="11"
                className="fill-current text-[#53bdeb] mb-[-2px]"
              >
                <path d="M11.05 1L5.5 6.55l-2.05-2.05-1.45 1.45 3.5 3.5 7-7-1.45-1.45zM15 1L9.45 6.55 7.4 4.5l-1.45 1.45 3.5 3.5 7-7L15 1z"></path>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
