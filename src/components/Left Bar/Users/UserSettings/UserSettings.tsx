/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteDoc, doc, getDoc, updateDoc } from "@firebase/firestore";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authFBConfig, db } from "../../../../config/config";
import { loginModeToggle, tokenInfo } from "../../../../redux/userSlice";
import {
  UserDataUpdate,
  UserSettingsProps,
} from "../../../../types/UserSettingsTypes";
import { UserSliceStateSelector } from "../../../../types/UserTypes";
import { images } from "../../../../utils/images";
import AccountDetails from "./Account/AccountDetails";
import DeleteSettings from "./Account/DeleteSettings";
import StatusSettings from "./Account/StatusSettings";
import AvatarSettings from "./Avatar/AvatarSettings";
import DisplayNameSettings from "./DisplayName/DisplayNameSettings";
import EmailSettings from "./Email/EmailSettings";
import VerifyEmailModal from "./Email/VerifyEmailModal";
import PasswordSettings from "./Password/PasswordSettings";
import PhoneSettings from "./Phone/PhoneSettings";

const UserSettings: React.FC<UserSettingsProps> = ({
  setUserSettingsModalOpen,
  userSettingsModalOpen,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleImageClick = (index: any) => {
    setSelectedImageIndex(index);
    setDataUpdate((prev) => ({
      ...prev,
      photo: images[index].url,
    }));
  };

  const [deleteChecked, setDeleteChecked] = useState(false);
  const [verifyEmailModal, setVerifyEmailModal] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(
    (state: UserSliceStateSelector) => state.userStore.token,
  );

  const handleDeleteChange = () => {
    setDeleteChecked(!deleteChecked);
  };

  const [dataUpdate, setDataUpdate] = useState<UserDataUpdate>({
    name: authFBConfig.currentUser?.displayName || "",
    email: authFBConfig.currentUser?.email || "",
    password: "",
    phone: authFBConfig.currentUser?.phoneNumber || "",
    photo: "",
    status: "",
  });
  const [fetchedDatas, setFetchedDatas] = useState<UserDataUpdate>({
    name: "",
    email: "",
    uid: "",
    photo: "",
    status: "",
  });
  // console.log(authFBConfig);
  // console.log(authFBConfig.currentUser);
  const onchangeFunc = (e: any) => {
    setDataUpdate((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogout = () => {
    if (token) {
      signOut(authFBConfig)
        .then(() => {
          console.log("Signed out successfully");
        })
        .catch((error) => {
          console.error(error);
        });
      dispatch(tokenInfo(""));
      dispatch(loginModeToggle(false));
      authFBConfig.onAuthStateChanged((user) => {
        if (user) {
          localStorage.removeItem("user");
        }
      });
    } else {
      console.error("User is not authenticated. Cannot sign out.");
    }
  };
  const submitUpdateDatas = async (e: any) => {
    e.preventDefault();
    try {
      const user = authFBConfig.currentUser;
      if (!user) {
        toast.error("User not authenticated.");
        return;
      }
      const customDocRef = doc(db, "users", user.uid);

      // if (dataUpdate.password !== "") {
      //   await updatePassword(user, dataUpdate.password);
      //   console.log("password");
      // }

      if (user !== null) {
        if (dataUpdate.name !== "") {
          await updateProfile(user, {
            displayName: dataUpdate.name,
          });
          await updateDoc(customDocRef, {
            name: dataUpdate.name,
          });
          console.log("name");
        }
        if (dataUpdate.email !== "") {
          console.log(dataUpdate.email);
          await verifyBeforeUpdateEmail(user, dataUpdate.email as string);
          await onAuthStateChanged;
          await updateDoc(customDocRef, {
            email: dataUpdate.email,
          });
          console.log("email");
        }
        if (dataUpdate.photo !== "") {
          await updateProfile(user, {
            photoURL: dataUpdate.photo,
          });
          await updateDoc(customDocRef, {
            photo: dataUpdate.photo,
          });
          console.log("photo");
        }
        if (dataUpdate.status !== "") {
          await updateDoc(customDocRef, {
            status: dataUpdate.status,
          });
          console.log("status");
        }
        if (deleteChecked == true) {
          try {
            await user?.delete();
            console.log("Kullanıcı hesabı silindi.");
            await deleteDoc(customDocRef);
            console.log("Belge başarıyla silindi.");
            handleLogout();
            setUserSettingsModalOpen(false);
          } catch (error) {
            console.error("Silme hatası:", error);
          }
        }
        // if (dataUpdate.phone !== "") {
        //    try {
        //      const credential = await PhoneAuthProvider.credential(
        //        verificationId,
        //        verificationCode
        //      );
        //      await updatePhoneNumber(user, credential);
        //      console.log("phone");
        //    } catch (error) {
        //      console.error(error);
        //      // Handle the error, display a message, or log it as needed.
        //      // You may want to notify the user that there was an issue updating the phone number.
        //    }
        //   // try {
        //   //   await updatePhoneNumber(user, dataUpdate.phone);
        //   // } catch (error) {
        //   //   console.error(error);
        //   // }
        //   await updateDoc(customDocRef, {
        //     phone: dataUpdate.phone,
        //   });
        //   console.log("phone");
        // }
      }
      setDataUpdate({
        name: "",
        email: "",
        password: "",
        phone: "",
        photo: "",
        status: "",
      });
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Authentication failed: " + error);
    }
  };
  const fetchFromDB = async () => {
    const user = authFBConfig.currentUser;
    if (!user) return;

    try {
      const customDocRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(customDocRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setFetchedDatas({
          name: data?.name || "",
          email: data?.email || "",
          photo: data?.photo || "",
          status: data?.status || "",
          uid: data?.uid || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    if (userSettingsModalOpen) {
      fetchFromDB();
    }
  }, [userSettingsModalOpen]);
  return (
    <div>
      {/* Settings Drawer - Slides over the sidebar */}
      <div
        className={`absolute top-0 left-0 h-full w-full bg-whatsapp-panel z-20 transition-transform duration-300 ${userSettingsModalOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}
      >
        <div className="h-[108px] bg-whatsapp-outgoing flex items-end pb-4 px-6 text-white shrink-0">
          <div className="flex items-center gap-8 w-full">
            <button
              onClick={() => setUserSettingsModalOpen(false)}
              className="hover:bg-inherit"
            >
              <svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="fill-current text-white"
              >
                <path d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path>
              </svg>
            </button>
            <h1 className="text-[19px] font-medium">Profile</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AccountDetails fetchedDatas={fetchedDatas}></AccountDetails>

          <div className="bg-whatsapp-panel px-8 pb-8 pt-4">
            <div className="mb-6">
              <span className="text-whatsapp-teal text-[14px] mb-4 block">
                Your name
              </span>
              <DisplayNameSettings
                onchangeFunc={onchangeFunc}
                dataUpdate={dataUpdate}
              ></DisplayNameSettings>
            </div>

            <div className="mb-6">
              <span className="text-whatsapp-secondary text-[14px] block mb-4">
                This is not your username or pin. This name will be visible to
                your WhatsApp contacts.
              </span>
            </div>

            <div className="mb-6">
              <span className="text-whatsapp-teal text-[14px] mb-4 block">
                About
              </span>
              <StatusSettings
                onchangeFunc={onchangeFunc}
                dataUpdate={dataUpdate}
              ></StatusSettings>
            </div>

            {/* Additional settings can be hidden or styled similarly */}
            <div className="hidden">
              <EmailSettings
                onchangeFunc={onchangeFunc}
                dataUpdate={dataUpdate}
                setVerifyEmailModal={setVerifyEmailModal}
              />
              <PasswordSettings
                onchangeFunc={onchangeFunc}
                dataUpdate={dataUpdate}
              />
              <PhoneSettings
                onchangeFunc={onchangeFunc}
                dataUpdate={dataUpdate}
              />
              <AvatarSettings
                selectedImageIndex={selectedImageIndex}
                handleImageClick={handleImageClick}
              />
              <DeleteSettings
                deleteChecked={deleteChecked}
                handleDeleteChange={handleDeleteChange}
              />
            </div>

            <div className="mt-8 flex justify-center">
              <button
                className="bg-whatsapp-teal text-white py-2 px-6 rounded shadow-sm hover:bg-[#008f6f] transition-colors"
                onClick={submitUpdateDatas}
              >
                Save Changes
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {verifyEmailModal && (
        <VerifyEmailModal
          setVerifyEmailModal={setVerifyEmailModal}
          verifyEmailModal={verifyEmailModal}
        ></VerifyEmailModal>
      )}
    </div>
  );
};

export default UserSettings;
