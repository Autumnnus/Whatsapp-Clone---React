/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DocumentData, collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftHeader from "../components/Left Bar/LeftHeader";
import MessageInbox from "../components/Left Bar/Messages/MessageInbox";
import SearchInput from "../components/Left Bar/SearchInput";
import Users from "../components/Left Bar/Users/Users";
import UserSettings from "../components/Left Bar/Users/UserSettings/UserSettings";
import Login from "../components/Right Bar/Auth/Login";
import Signup from "../components/Right Bar/Auth/Signup";
import Chat from "../components/Right Bar/Chat/Chat";
import NoChat from "../components/Right Bar/Chat/NoChat";
import UserInfo from "../components/Right Bar/Chat/UserInfo";
import RightHeader from "../components/Right Bar/RightHeader";
import { authFBConfig, db } from "../config/config";
import { authInfo, fetchUsersFromDB } from "../redux/userSlice";
import { MessageSliceStateSelector } from "../types/MessageTypes";
import { UserSliceStateSelector } from "../types/UserTypes";

const Home = () => {
  const dispatch = useDispatch();
  const [toggleMessageUserBar, setToggleMessageUserBar] =
    useState<boolean>(true);
  const loginMode = useSelector(
    (state: UserSliceStateSelector) => state.userStore.loginMode,
  );
  const toggleLoginOrSignup = useSelector(
    (state: UserSliceStateSelector) => state.userStore.toggleLoginOrSignup,
  );
  const openChatMode = useSelector(
    (state: MessageSliceStateSelector) => state.messageStore.chatMode,
  );

  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [userSettingsModalOpen, setUserSettingsModalOpen] = useState(false);

  const auth = authFBConfig;
  useEffect(() => {
    const authInfoPayload = {
      app: {
        name: auth.app.name,
      },
      currentUser: auth.currentUser,
    };
    dispatch(authInfo(authInfoPayload));
  }, [dispatch, auth]);

  const token = useSelector(
    (state: UserSliceStateSelector) => state.userStore.token,
  );
  useEffect(() => {}, [token]);

  const users = useSelector(
    (state: UserSliceStateSelector) => state.userStore.users,
  );

  const fetchFromDB = async () => {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);
    const users: { id: string; data: DocumentData }[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, data: doc.data() });
    });
    dispatch(fetchUsersFromDB(users));
  };

  useEffect(() => {
    fetchFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full h-full bg-whatsapp-bg overflow-hidden relative">
      {/* Left Sidebar */}
      <div
        className={`flex flex-col h-full bg-whatsapp-panel border-r border-[#313d45] relative z-20 ${token ? "w-full md:w-[420px] lg:w-[450px] shrink-0" : "w-full md:w-[30%]"}`}
      >
        <LeftHeader
          setUserSettingsModalOpen={setUserSettingsModalOpen}
          setToggleMessageUserBar={setToggleMessageUserBar}
        />

        {token && (
          <div className="bg-whatsapp-panel shrink-0">
            <SearchInput />
          </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-whatsapp-panel overflow-x-hidden">
          {toggleMessageUserBar && token ? (
            <MessageInbox />
          ) : token ? (
            // @ts-ignore
            <Users users={users} />
          ) : null}
        </div>

        <UserSettings
          setUserSettingsModalOpen={setUserSettingsModalOpen}
          userSettingsModalOpen={userSettingsModalOpen}
          // @ts-ignore
          users={users}
        />
      </div>

      {/* Right Chat Area */}
      <div
        className={`flex-col flex-1 h-full bg-[#0b141a] relative ${token ? "hidden md:flex" : "flex w-full"}`}
      >
        {!loginMode && !token ? (
          <div className="flex items-center justify-center h-full w-full bg-whatsapp-bg">
            <div className="w-full max-w-md p-6">
              {toggleLoginOrSignup ? <Login /> : <Signup />}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full w-full relative overflow-hidden">
            {/* Background Pattern Layer */}
            <div
              className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
              }}
            ></div>

            {openChatMode && token && (
              <RightHeader
                setUserInfoModalOpen={setUserInfoModalOpen}
                // @ts-ignore
                users={users}
              />
            )}

            <div className="flex-1 overflow-hidden relative z-10 p-0">
              {openChatMode && !loginMode ? <Chat /> : <NoChat />}
            </div>
          </div>
        )}

        {/* Modals */}
        <UserInfo
          setUserInfoModalOpen={setUserInfoModalOpen}
          userInfoModalOpen={userInfoModalOpen}
          // @ts-ignore
          users={users}
        />
      </div>
    </div>
  );
};

export default Home;
