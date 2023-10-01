import React from "react";
import UploadImages from "@/components/admin/UploadImages";
import { Types } from "mongoose";

const HomePage = async ({ params }: { params: { id: Types.ObjectId } }) => {
  return <UploadImages productId={params.id} />;
};

export default HomePage;
