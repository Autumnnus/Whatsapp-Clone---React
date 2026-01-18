/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "@firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { useSelector } from "react-redux";
import { authFBConfig, db } from "../../../config/config";
import { MessageSliceStateSelector } from "../../../types/MessageTypes";
import ChatMessage from "./ChatMessage";

type Message = {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
  user: string;
  userId: string;
  room: string;
  id: string;
};

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = collection(db, "messages");
  const chatID = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.chatID || [],
  );
  useEffect(() => {
    const querryMessages = query(
      messagesRef,
      where("room", "==", chatID),
      orderBy("createdAt"),
    );
    const unsuscribe = onSnapshot(querryMessages, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((doc) => {
        // @ts-ignore
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });
    return () => unsuscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatID]);
  const handleSubmit = async () => {
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: authFBConfig.currentUser?.displayName,
      userId: authFBConfig.currentUser?.uid,
      room: chatID,
    });
    setNewMessage("");
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onKeyPressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="flex flex-col h-full relative z-10 w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto px-[5%] py-4 custom-scrollbar">
        <div className="flex flex-col justify-end min-h-full pb-2">
          {messages.map((message) => (
            <ChatMessage key={message.id} msg={message}></ChatMessage>
          ))}
        </div>
      </div>
      <div className="bg-whatsapp-header px-4 py-2 flex items-center min-h-[62px] z-20 shrink-0 gap-2">
        <div className="flex items-center space-x-1 text-whatsapp-secondary">
          <button className="p-2 hover:bg-[#3c454c] rounded-full transition-colors">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-current"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-4-10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm-5.5 4c.5 1.5 2 3 4 3s3.5-1.5 4-3H8z"></path>
            </svg>
          </button>
          <button className="p-2 hover:bg-[#3c454c] rounded-full transition-colors">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-current"
            >
              <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"></path>
            </svg>
          </button>
        </div>
        <div className="flex-1 bg-whatsapp-input rounded-lg flex items-center px-4 py-2 mx-2">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-transparent outline-none flex-grow text-whatsapp-primary placeholder:text-[#8696a0] text-[15px]"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            // @ts-ignore
            ref={inputRef}
            onKeyPress={(e) => onKeyPressInput(e)}
          />
        </div>
        <button
          className="p-2 hover:bg-[#3c454c] rounded-full transition-colors text-whatsapp-secondary"
          onClick={handleSubmit}
        >
          {newMessage.trim() === "" ? (
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-current"
            >
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
              <path d="M11.999 2C6.477 2 2 6.486 2 12.008c0 5.523 4.477 10.001 10 10.001s10-4.478 10-10.001C22 6.486 17.522 2 11.999 2zm0 18.001c-4.411 0-8-3.597-8-8.002 0-4.405 3.589-8.001 8-8.001s8 3.596 8 8.001c0 4.405-3.589 8.002-8 8.002z"></path>
              <path d="M12 17c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5zm0-8a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"></path>
            </svg>
          ) : (
            <BiSolidSend size={24} className="text-whatsapp-teal" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Chat;
