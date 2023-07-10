import axios from "axios";
import { cookies } from "next/headers";
import queryString from "query-string";
import ListOrders from "@/components/orders/ListOrders";

const getOrders = async (searchParams) => {
    const nextCookies = cookies();
    const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

    const urlParams = {
        page: searchParams.page || 1
    };

    const searchQuery = queryString.stringify(urlParams);

    const { data } = await axios.get(`${process.env.API_URL}/api/orders/me?${searchQuery}`,
        {
            headers: {
                Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
            },
        });
       
    return data;
};

const MyOrdersPage = async ({ searchParams }) => {
    const orders = await getOrders(searchParams);

    return <ListOrders orders={orders} />;
};

export default MyOrdersPage;