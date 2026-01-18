import { collection, onSnapshot, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authFBConfig, db } from "../../../config/config";
import { UserSliceStateSelector } from "../../../types/UserTypes";
import UserCard from "../Users/UserCard";

const MessageInbox: React.FC = () => {
  const [activeChats, setActiveChats] = useState<any[]>([]);
  const users = useSelector(
    (state: UserSliceStateSelector) => state.userStore.users,
  );

  // Use the standard Firebase currentUser UID
  const currentUid = authFBConfig.currentUser?.uid;

  useEffect(() => {
    if (!currentUid) return;

    const messagesRef = collection(db, "messages");
    // We can't use 'contains' on the room string easily in Firestore query,
    // but we can listen to all messages and filter unique rooms locally for a simple app.
    // In a real app, you'd have a 'chats' collection.
    const q = query(messagesRef);
    console.log("q", q);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms = new Set<string>();
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.room && data.room.includes(currentUid)) {
          rooms.add(data.room);
        }
        console.log("data", data);
      });

      const participantIds = Array.from(rooms).map((room) => {
        const ids = room.split("?");
        return ids[0] === currentUid ? ids[1] : ids[0];
      });

      // Filter global users list to only include those we have a chat with
      const chats = (users ?? []).filter((u) => participantIds.includes(u.id));
      setActiveChats(chats);
    });

    return () => unsubscribe();
  }, [currentUid, users]);

  return (
    <div className="flex flex-col w-full">
      {activeChats.length > 0 ? (
        activeChats.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.data.name}
            photo={user.data.photo}
            status={user.data.status}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-[200px] px-6 text-center">
          <p className="text-whatsapp-secondary text-sm">
            No active chats found.
          </p>
          <p className="text-whatsapp-teal text-xs mt-2 cursor-pointer hover:underline">
            Start a new chat from the contacts icon above.
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageInbox;
