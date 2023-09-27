import React from "react";
import UploadImages from "@/components/admin/UploadImages";

const HomePage = async ({ params }) => {
  return <UploadImages productId={params.id} />;
};

export default HomePage;
