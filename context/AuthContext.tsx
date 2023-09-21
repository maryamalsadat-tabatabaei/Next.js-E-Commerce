import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useContext } from "react";
import User from "@/interfaces/user";
import Address from "@/interfaces/address";

export interface AuthContextProps {
  user: User | null;
  setUser: (newValue: User | null) => void;
  error: string | null;
  loading: { message: string } | null;
  updated: boolean;
  registerUser: (user: User) => void;
  clearErrors: () => void;
  addNewUserAddress: (address: Address) => void;
}
const initialAuthContext = {
  user: {
    name: "",
    email: "",
    password: "",
  },
  updated: false,
  loading: { message: "" },
  error: "",
  registerUser: (user: User) => {},
  clearErrors: () => {},
  setUser: () => {},
  addNewUserAddress: (address: Address) => {},
};

export const AuthContext = createContext<AuthContextProps>(initialAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);
  const registerUser = async ({ ...user }: User) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/auth/register`,
        { ...user }
      );
      if (data?.user) {
        setUser(data?.user);
        router.push("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const error = err.response.data.message;
        setError(error);
      } else {
        console.error(err);
      }
    }
  };
  const clearErrors = () => {
    setError(null);
  };
  const addNewUserAddress = async ({ ...address }: Address) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/address`,
        address
      );
      if (data) {
        router.push("/profile");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const error = err.response.data.message;
        setError(error);
      } else {
        console.error(err);
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        loading,
        updated,
        registerUser,
        clearErrors,
        addNewUserAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
