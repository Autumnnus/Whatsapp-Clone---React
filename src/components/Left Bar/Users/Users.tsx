/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DocumentData } from "@firebase/firestore";
import { authFBConfig } from "../../../config/config";
import UserCard from "./UserCard";

type UsersProps = {
  users?: { id: string; data: DocumentData }[];
};

const Users: React.FC<UsersProps> = ({ users }) => {
  const filteredUsers = (users ?? []).filter(
    (user) => user.id !== authFBConfig.currentUser?.uid,
  );

  return (
    <div className="flex flex-col w-full">
      {filteredUsers.map((user) => (
        <UserCard
          key={user.data.uid}
          id={user.data.uid}
          name={user.data.name}
          photo={user.data.photo}
          status={user.data.status}
        />
      ))}
    </div>
  );
};

export default Users;
