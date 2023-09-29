import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import UpdateUser from "@/components/admin/UpdateUser";

const getUser = async ({ userId }: { userId: string }) => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/admin/users/${userId}`,
    {
      headers: {
        Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
      },
    }
  );
  if (!data.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }
  return data;
};

export default async function UpdateUserPage({
  params,
}: {
  params: { id: string };
}) {
  const isValidId = mongoose.isValidObjectId(params?.id);

  if (!isValidId) {
    return redirect("/");
  }
  const data = await getUser({ userId: params?.id });
  return <UpdateUser user={data?.user} />;
}
