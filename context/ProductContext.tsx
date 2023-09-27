import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useContext } from "react";
import { ProductForm } from "@/interfaces/product";
import { Types } from "mongoose";

export interface ProductContextProps {
  setUpdated: (newValue: boolean) => void;
  setDeleted: (newValue: boolean) => void;
  error: string | null;
  loading: boolean | null;
  updated: boolean;
  deleted: boolean;
  clearErrors: () => void;
  createProduct: (product: ProductForm) => void;
  uploadProductImages: (formData: FormData, productId: Types.ObjectId) => void;
  updateProduct: (formData: ProductForm, productId: Types.ObjectId) => void;
  deleteProduct: (productId: Types.ObjectId) => void;
}
const initialProductContext = {
  updated: false,
  deleted: false,
  loading: null,
  error: "",
  clearErrors: () => {},
  setUpdated: () => false,
  setDeleted: () => false,
  createProduct: (product: ProductForm) => {},
  uploadProductImages: (formData: FormData, productId: Types.ObjectId) => {},
  updateProduct: (formData: ProductForm, productId: Types.ObjectId) => {},
  deleteProduct: (productId: Types.ObjectId) => {},
};

export const ProductContext = createContext<ProductContextProps>(
  initialProductContext
);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [updated, setUpdated] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const clearErrors = () => {
    setError(null);
  };
  const createProduct = async (product: ProductForm) => {
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/admin/products`,
        product
      );
      if (data) {
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  const uploadProductImages = async (
    formData: FormData,
    productId: Types.ObjectId
  ) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.API_URL}/api/admin/products/upload-images/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.data) {
        setLoading(false);
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  const updateProduct = async (
    product: ProductForm,
    productId: Types.ObjectId
  ) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/admin/products/${productId}`,
        product
      );
      if (data) {
        setUpdated(true);
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  const deleteProduct = async (productId: Types.ObjectId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/admin/products/${productId}`
      );
      if (data?.success) {
        setDeleted(true);
        router.replace("/admin/products");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        setUpdated,
        deleted,
        setDeleted,
        clearErrors,
        createProduct,
        uploadProductImages,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProductContext = () => {
  const productContext = useContext(ProductContext);

  return productContext;
};
