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
    <div className="flex flex-col h-full relative z-10 w-full">
      <div className="flex-1 overflow-y-auto px-[5%] py-2 custom-scrollbar">
        <div className="flex flex-col justify-end min-h-full pb-2">
          {messages.map((message) => (
            <ChatMessage key={message.id} msg={message}></ChatMessage>
          ))}
        </div>
      </div>
      <div className="bg-whatsapp-header px-4 py-2 flex items-center min-h-[62px] z-20 shrink-0">
        <div className="w-full bg-whatsapp-input rounded-lg flex items-center px-4 py-2">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-transparent outline-none flex-grow text-whatsapp-primary placeholder-whatsapp-secondary text-sm"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            // @ts-ignore
            ref={inputRef}
            onKeyPress={(e) => onKeyPressInput(e)}
          />
        </div>
        <button className="ml-4 p-2" onClick={handleSubmit}>
          <BiSolidSend
            size={24}
            className="text-whatsapp-secondary hover:text-whatsapp-teal transition-colors"
          />
        </button>
      </div>
    </div>
  );
};

export default Chat;
