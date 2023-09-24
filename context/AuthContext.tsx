import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useContext } from "react";
import User, { UpdatePasswordForm } from "@/interfaces/user";
import { FormAddress } from "@/interfaces/address";

export interface AuthContextProps {
  user: User | null;
  setUser: (newValue: User | null) => void;
  setUpdated: (newValue: boolean) => void;
  setDeleted: (newValue: boolean) => void;
  error: string | null;
  loading: boolean | null;
  updated: boolean;
  deleted: boolean;
  registerUser: (user: User) => void;
  clearErrors: () => void;
  addNewUserAddress: (address: FormAddress) => void;
  updatePassword: (formPassword: UpdatePasswordForm) => void;
  updateAddress: (addressId: string, address: FormAddress) => void;
  deleteAddress: (addressId: string) => void;
  updateProfile: (formData: FormData) => void;
}
const initialAuthContext = {
  user: {
    name: "",
    email: "",
    password: "",
  },
  updated: false,
  deleted: false,
  loading: null,
  error: "",
  registerUser: (user: User) => {},
  clearErrors: () => {},
  setUser: () => {},
  setUpdated: () => false,
  setDeleted: () => false,
  addNewUserAddress: (address: FormAddress) => {},
  updatePassword: (formPassword: UpdatePasswordForm) => {},
  updateAddress: (addressId: string, address: FormAddress) => {},
  deleteAddress: (addressId: string) => {},
  updateProfile: (formData: FormData) => {},
};

export const AuthContext = createContext<AuthContextProps>(initialAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [updated, setUpdated] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);

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
  const loadUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/auth/session?update");
      if (data?.user) {
        setUser(data.user);
        router.replace("/profile");
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
  const updateProfile = async (formData: FormData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.API_URL}/api/auth/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.user) {
        console.log("userrrrrr", data?.user);
        loadUser();
        setLoading(false);
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
  const updatePassword = async ({ ...formPassword }: UpdatePasswordForm) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/auth/profile/update-password`,
        formPassword
      );
      if (data?.success) {
        setUpdated(true);
        router.replace("/profile");
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
        setUpdated(true);
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
        // router.replace(`/address/${addressId}`);
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
  const deleteAddress = async (addressId: string) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/address/${addressId}`
      );
      if (data?.success) {
        setDeleted(true);
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
        updateProfile,
        updatePassword,
        // updateUser,
        // deleteUser,
        updateAddress,
        deleteAddress,
        deleted,
        setDeleted,
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
