import { redirect } from "next/navigation";
import mongoose from "mongoose";
import UploadImages from "@/components/admin/UploadImages";

const UploadImagesPage = async ({ params }) => {
    const isValidId = mongoose.isValidObjectId(params?.id);

    if (!isValidId) {
      return redirect("/admin/products");
    }

    return <UploadImages id={params.id} />;
};

export default UploadImagesPage;
