"use client";
import {
  useReducer,
  useEffect,
  useContext,
  FormEvent,
  ChangeEvent,
} from "react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Image from "next/image";

interface State {
  name: string;
  email: string;
  avatar: Blob | string;
  avatarPreview: string;
}

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_AVATAR"; payload: Blob | string }
  | {
      type: "SET_AVATAR_PREVIEW";
      payload: string;
    };

const initialState: State = {
  name: "",
  email: "",
  avatar: "",
  avatarPreview: "/images/default.png",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_AVATAR":
      return { ...state, avatar: action.payload };
    case "SET_AVATAR_PREVIEW":
      return { ...state, avatarPreview: action.payload };
    default:
      return state;
  }
}

const UpdateProfile = () => {
  const { user, error, loading, updateProfile, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (user) {
      dispatch({ type: "SET_EMAIL", payload: user.email });
      dispatch({ type: "SET_NAME", payload: user.name });
      dispatch({
        type: "SET_AVATAR_PREVIEW",
        payload: user?.avatar
          ? (user?.avatar?.url as string)
          : "/images/default.png",
      });
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, user, clearErrors]);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   formData.set(key, value);
    // });
    formData.set("name", state.name);
    formData.set("email", state.email);
    formData.append("image", state.avatar as File);

    updateProfile(formData);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        dispatch({
          type: "SET_AVATAR_PREVIEW",
          payload: reader?.result as string,
        });
      }
    };

    dispatch({ type: "SET_AVATAR", payload: e.target?.files?.[0] as File });

    if (e.target?.files?.[0]) {
      reader.readAsDataURL(e.target.files[0] as Blob);
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
      >
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

          <div className="mb-4">
            <label className="block mb-1"> Full Name </label>
            <input
              value={state.name}
              onChange={(e) =>
                dispatch({ type: "SET_NAME", payload: e.target.value })
              }
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Email </label>
            <input
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="text"
              placeholder="Type your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1"> Avatar </label>
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
                <Image
                  width={56}
                  height={56}
                  alt="user profile"
                  className="w-14 h-14 rounded-full"
                  src={state.avatarPreview || "/images/default.png"}
                />
              </div>
              <div className="md:w-2/3 lg:w-80">
                <input
                  className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                  type="file"
                  id="formFile"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
          </div>

          <button
            disabled={loading ? true : false}
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
