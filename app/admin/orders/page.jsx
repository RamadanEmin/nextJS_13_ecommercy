import Orders from "@/components/admin/Orders";
import axios from "axios";
import { cookies } from "next/headers";
import queryString from "query-string";

const getOrders = async (searchParams) => {
    const nextCookies = cookies();
    const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

    const urlParams = {
        page: searchParams.page || 1
    };

    const searchQuery = queryString.stringify(urlParams);

    const { data } = await axios.get(`${process.env.API_URL}/api/admin/orders?${searchQuery}`,
        {
            headers: {
                Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
            },
        });

    return data;
};

const AdminOrdersPage = async ({ searchParams }) => {
    const orders = await getOrders(searchParams);

    return <Orders orders={orders} />;
};

export default AdminOrdersPage;