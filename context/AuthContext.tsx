import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useContext } from "react";
import User from "@/interfaces/user";

export interface AuthContextProps {
  user: User | null;
  error: string | null;
  loading: { message: string } | null;
  updated: boolean;
  registerUser: (user: User) => void;
  clearErrors: () => void;
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
};

export const AuthContext = createContext<AuthContextProps>(initialAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
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
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        updated,
        registerUser,
        clearErrors,
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
