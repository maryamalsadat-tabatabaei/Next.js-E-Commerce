import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useContext } from "react";
import User from "@/interfaces/user";
import { FormAddress } from "@/interfaces/address";

export interface AuthContextProps {
  user: User | null;
  setUser: (newValue: User | null) => void;
  setUpdated: (newValue: boolean) => void;
  error: string | null;
  loading: { message: string } | null;
  updated: boolean;
  registerUser: (user: User) => void;
  clearErrors: () => void;
  addNewUserAddress: (address: FormAddress) => void;
  updateAddress: (addressId: string, address: FormAddress) => void;
  deleteAddress: (addressId: string) => void;
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
  setUpdated: () => false,
  addNewUserAddress: (address: FormAddress) => {},
  updateAddress: (addressId: string, address: FormAddress) => {},
  deleteAddress: (addressId: string) => {},
};

export const AuthContext = createContext<AuthContextProps>(initialAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState<boolean>(false);
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
  const addNewUserAddress = async ({ ...address }: FormAddress) => {
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
  const updateAddress = async (addressId: string, address: FormAddress) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/address/${addressId}`,
        address
      );

      if (data?.address) {
        setUpdated(true);
        router.replace(`/address/${addressId}`);
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
  const deleteAddress = async (addressId: string) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/address/${addressId}`
      );
      if (data?.sucsess) {
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
        addNewUserAddress,
        user,
        error,
        loading,
        updated,
        setUpdated,
        setUser,
        registerUser,
        // updateProfile,
        // updatePassword,
        // updateUser,
        // deleteUser,
        updateAddress,
        deleteAddress,
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
