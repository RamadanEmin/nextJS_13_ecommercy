import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import UpdateOrder from "@/components/admin/UpdateOrder";

const getOrder = async (id) => {
    const nextCookies = cookies();
    const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

    const { data } = await axios.get(`${process.env.API_URL}/api/admin/orders/${id}`,
        {
            headers: {
                Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
            },
        });

    return data;
};

const AdminOrderDetailsPage = async ({ params }) => {
    const isValidId = mongoose.isValidObjectId(params?.id);

    if (!isValidId) {
      return redirect("/admin/orders");
    }

    const data = await getOrder(params?.id);

    return <UpdateOrder order={data?.order} />;
};

export default AdminOrderDetailsPage;