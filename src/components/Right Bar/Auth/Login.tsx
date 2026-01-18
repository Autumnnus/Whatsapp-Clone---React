import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { authFBConfig } from "../../../config/config";
import {
  authInfo,
  loginModeToggle,
  toggleLoginOrSignupReducer,
  tokenInfo,
} from "../../../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = authFBConfig;

  const handleLogin = async () => {
    try {
      toast.info("Loading...", {
        hideProgressBar: true,
      });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(tokenInfo(JSON.stringify(user)));
        } else {
          localStorage.removeItem("user");
        }
      });
      const userPayload = {
        uid: user.uid,
        email: user.email,
      };
      dispatch(loginModeToggle(true));
      dispatch(authInfo(userPayload));
      location.reload();
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#202c33] text-whatsapp-primary p-10 rounded-2xl shadow-2xl w-full border border-[#313d45]">
      <div className="mb-10 text-center">
        <div className="bg-[#00a884] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00a88440]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-12 h-12 invert brightness-0"
          />
        </div>
        <h1 className="text-3xl font-light tracking-tight">Welcome Back</h1>
        <p className="text-whatsapp-secondary mt-2 text-sm">
          Please enter your details to login
        </p>
      </div>

      <div className="space-y-6 w-full mb-8">
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

      <div className="w-full space-y-4">
        <button
          className="w-full bg-whatsapp-teal text-white py-3.5 rounded-lg active:scale-95 transition-all duration-200 font-semibold shadow-lg shadow-[#00a88430] hover:bg-[#06cf9c]"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="text-center pt-2">
          <button
            className="text-whatsapp-secondary text-sm hover:text-whatsapp-teal transition-colors"
            onClick={() => dispatch(toggleLoginOrSignupReducer())}
          >
            Don't have an Account?{" "}
            <span className="font-semibold underline">Sign up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
