/* eslint-disable @typescript-eslint/ban-ts-comment */
import { collection, doc, setDoc } from "@firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import validator from "validator";
import { authFBConfig, db } from "../../../config/config";
import { toggleLoginOrSignupReducer } from "../../../redux/userSlice";
import { images } from "../../../utils/images";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const auth = authFBConfig;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [highlightImageIndex, setHighlightImageIndex] = useState(0);
  const handleImageClick = (index: SetStateAction<number>) => {
    // @ts-ignore
    setSelectedImageIndex(images[index].url);
    // @ts-ignore
    setHighlightImageIndex(images[index].id - 1);
    console.log(index);
  };
  useEffect(() => {
    handleImageClick(0);
  }, []);

  const handleSignup = async () => {
    try {
      const isEmailValid = validator.isEmail(email);
      if (!isEmailValid) {
        console.error("Invalid E-mail");
        toast.error("Invalid E-mail");
      } else if (!name) {
        console.error("Name is required");
        toast.error("Name is required");
      } else {
        //* AUTH
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name,
          photoURL: `${selectedImageIndex}`,
        });

        //* DATABASE
        const userRef = collection(db, "users");
        const customDocRef = doc(userRef, user.uid);
        await setDoc(customDocRef, {
          email: user.email,
          name: user.displayName,
          photo: selectedImageIndex,
          uid: user.uid,
        });
        console.log("Signed up:", user);
        dispatch(toggleLoginOrSignupReducer());
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Authentication failed: " + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#202c33] text-whatsapp-primary p-10 rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar border border-[#313d45]">
      <div className="mb-10 text-center">
        <div className="bg-[#00a884] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00a88440]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-10 h-10 invert brightness-0"
          />
        </div>
        <h1 className="text-3xl font-light tracking-tight">Create Account</h1>
        <p className="text-whatsapp-secondary mt-2 text-sm">
          Join the community today
        </p>
      </div>

      <div className="space-y-6 w-full mb-8">
        <div className="relative group">
          <input
            type="text"
            id="name"
            className="peer w-full bg-transparent border-b-2 border-[#313d45] py-2 text-whatsapp-primary placeholder-transparent focus:outline-none focus:border-whatsapp-teal transition-all duration-300"
            placeholder=" "
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor="name"
            className="absolute left-0 top-2 text-whatsapp-secondary text-base transition-all duration-300 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-whatsapp-teal peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-whatsapp-teal peer-[:not(:placeholder-shown)]:text-xs"
          >
            Full Name
          </label>
        </div>

        <div className="relative group">
          <input
            type="email"
            id="email"
            className="peer w-full bg-transparent border-b-2 border-[#313d45] py-2 text-whatsapp-primary placeholder-transparent focus:outline-none focus:border-whatsapp-teal transition-all duration-300"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className="absolute left-0 top-2 text-whatsapp-secondary text-base transition-all duration-300 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-whatsapp-teal peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-whatsapp-teal peer-[:not(:placeholder-shown)]:text-xs"
          >
            E-mail Address
          </label>
        </div>

        <div className="relative group">
          <input
            type="password"
            id="password"
            className="peer w-full bg-transparent border-b-2 border-[#313d45] py-2 text-whatsapp-primary placeholder-transparent focus:outline-none focus:border-whatsapp-teal transition-all duration-300"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className="absolute left-0 top-2 text-whatsapp-secondary text-base transition-all duration-300 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-whatsapp-teal peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-whatsapp-teal peer-[:not(:placeholder-shown)]:text-xs"
          >
            Password
          </label>
        </div>
      </div>

      <div className="mb-8 w-full">
        <label className="block text-whatsapp-teal text-xs mb-4 uppercase tracking-wider font-semibold">
          Select Profile Picture
        </label>
        <div className="grid grid-cols-6 gap-3">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`relative rounded-full cursor-pointer transition-all duration-300 ${
                highlightImageIndex === index
                  ? "ring-4 ring-whatsapp-teal ring-offset-4 ring-offset-[#202c33] scale-110"
                  : "hover:scale-110 opacity-60 hover:opacity-100"
              }`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.url}
                alt="avatar"
                className="w-full h-full rounded-full object-cover shadow-md"
              />
              {highlightImageIndex === index && (
                <div className="absolute -right-1 -bottom-1 bg-whatsapp-teal text-white rounded-full p-0.5 shadow-lg">
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    className="fill-current"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full space-y-4">
        <button
          className="w-full bg-whatsapp-teal text-white py-3.5 rounded-lg active:scale-95 transition-all duration-200 font-semibold shadow-lg shadow-[#00a88430] hover:bg-[#06cf9c]"
          onClick={handleSignup}
        >
          Create Account
        </button>
        <div className="text-center pt-2">
          <button
            className="text-whatsapp-secondary text-sm hover:text-whatsapp-teal transition-colors"
            onClick={() => dispatch(toggleLoginOrSignupReducer())}
          >
            Already have an account?{" "}
            <span className="font-semibold underline">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
