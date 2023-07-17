import axios from "axios";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import UpdateProduct from "@/components/admin/UpdateProduct";

const getProduct = async (id) => {
    const { data } = await axios.get(`${process.env.API_URL}/api/products/${id}`);

    return data;
};

const HomePage = async ({ params }) => {
    const isValidId = mongoose.isValidObjectId(params?.id);

    if (!isValidId) {
      return redirect("/admin/products");
    }

    const data = await getProduct(params.id);

    return <UpdateProduct data={data.product} />;
};

export default HomePage;
