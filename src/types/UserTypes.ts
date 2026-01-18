import { DocumentData } from "@firebase/firestore";

export type userSliceType = {
  users: { id: string; data: DocumentData }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auth: any;
  token: string;
  loginMode: boolean;
  toggleLoginOrSignup: boolean;
  loggedUser: string | null;
};

export type UserSliceStateSelector = {
  userStore: {
    users?: { id: string; data: DocumentData }[];
    token?: string;
    toggleLoginOrSignup?: boolean;
    loginMode?: boolean;
    loggedUser?: {
      uid?: string;
      displayName?: string;
      photoURL?: string;
    };
  };
};

export type User = {
  uid: string;
  name: string;
  photo: string;
};

// export type UsersProps = {
//   users: User[];
// };

export type UsersProps = {
  users?: { id: string; data: DocumentData }[];
};
export type UsersPropsArray = {
  users?: string[];
};
