import axios from "axios";
import { cookies } from "next/headers";
import { getCookieName } from "@/helpers/getCookieName";
import UpdateAddress from "@/components/user/UpdateAddress";

const getAddress = async ({ addressId }: { addressId: string }) => {
  const nextCookies = cookies();
  const cookieName = getCookieName();
  const nextAuthSessionToken = nextCookies.get(cookieName);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/address/${addressId}`,
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
  return data?.address;
};

export default async function UpdateAddressPage({
  params,
}: {
  params: { id: string };
}) {
  const address = await getAddress({ addressId: params?.id });

  return <UpdateAddress addressId={params?.id} address={address} />;
}
