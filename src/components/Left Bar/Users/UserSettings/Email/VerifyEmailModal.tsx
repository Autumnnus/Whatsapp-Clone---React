import { sendEmailVerification } from "firebase/auth";
import { AiFillCloseCircle } from "react-icons/ai";
import { authFBConfig } from "../../../../../config/config";
type VerifyEmailModalProps = {
  verifyEmailModal: boolean;
  setVerifyEmailModal: (isOpen: boolean) => void;
};

const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  verifyEmailModal,
  setVerifyEmailModal,
}) => {
  const verifyEmail = async () => {
    try {
      // Check if the user is signed in
      const user = authFBConfig.currentUser;
      if (user) {
        // Send email verification
        await sendEmailVerification(user);
      } else {
        // Handle the case where the user is not signed in
        console.error("User is not signed in");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };
  return (
    <div>
      {verifyEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <div className="bg-gray-100 p-4 rounded shadow-lg text-black fixed left-50 o">
            <div className="flex justify-between">
              <h2 className="text-2xl mb-4 px-2">Verify Email</h2>
              <AiFillCloseCircle
                size={28}
                onClick={() => setVerifyEmailModal(false)}
                className="text-red-500 cursor-pointer rounded-full hover:text-red-800"
              ></AiFillCloseCircle>
            </div>
            <div className="flex space-x-10 bg-slate-200 p-2 rounded-md text-black">
              <h1>
                Send Verification Link to{" "}
                <span
                  onClick={verifyEmail}
                  className="font-bold cursor-pointer"
                >
                  {authFBConfig.currentUser?.email}
                </span>
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailModal;
