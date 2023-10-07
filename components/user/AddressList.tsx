"use client";
import Address from "@/interfaces/address";
import Link from "next/link";
import { FaMapMarker } from "react-icons/fa";
import geocodeAddress from "@/helpers/geoCodeAddress";
import { useEffect, useState } from "react";
import UserAddressMap from "./UserAddressMap";

const AddressList = ({ address }: { address: Address }) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: any;
    longitude: any;
  } | null>(null);
  const userAddress = `${address.street},${address.city},${address.zipCode},${address.country}`;

  useEffect(() => {
    const fetchUserLocation = async () => {
      if (!address.location) {
        const location = await geocodeAddress(userAddress);
        setUserLocation(location);
      } else {
        setUserLocation(address.location);
      }
    };

    fetchUserLocation();
  }, [userAddress, setUserLocation, address.location]);

  return (
    <div className="flex justify-between flex-1 bg-gray-100 mb-4">
      <div className="gap-4 my-auto w-1/2">
        <Link href={`/address/${address._id}`}>
          <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
            <div className="mr-3">
              <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2">
                <FaMapMarker size={20} />
              </span>
            </div>
            <figcaption className="text-gray-600">
              <p>
                {address.street} street
                <br /> {address.city}, {address.state}, {address.zipCode},{" "}
                {address.country}
                <br />
                Phone no: {address.phoneNo}
              </p>
            </figcaption>
          </figure>
        </Link>
      </div>
      <div className="w-1/2">
        <UserAddressMap {...userLocation} />
      </div>
    </div>
  );
};

export default AddressList;
