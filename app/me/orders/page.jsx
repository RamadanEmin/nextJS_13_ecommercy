import axios from "axios";
import { cookies } from "next/headers";
import ListOrders from "@/components/orders/ListOrders";

const getOrders = async () => {
    const nextCookies = cookies();
    const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

    const { data } = await axios.get(`${process.env.API_URL}/api/orders/me`,
        {
            headers: {
                Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
            },
        });
       
    return data;
};

const MyOrdersPage = async () => {
    const orders = await getOrders();

    return <ListOrders orders={orders} />;
};

export default MyOrdersPage;