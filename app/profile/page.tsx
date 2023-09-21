import Profile from "@/components/auth/Profile";
import axios from "axios";

import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";

export const metadata = {
  title: "Address Page",
};
const getAddresses = async () => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
    headers: {
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    },
  });
  if (!data.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }
  return data?.addresses;
};
export default async function ProfilePage() {
  const userAddressList = await getAddresses();
  return <Profile userAddressList={userAddressList} />;
}
