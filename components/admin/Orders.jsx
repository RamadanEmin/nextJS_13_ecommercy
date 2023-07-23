'use client';

import { useContext, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import CustomPagination from "../layouts/CustomPagination";
import OrderContext from "@/context/OrderContext";

const Orders = ({ orders }) => {
    const { deleteOrder, error, clearErrors } = useContext(OrderContext);

    useEffect(() => {
        if (error) {
            toast.success(error);
            clearErrors();
        }
    }, [error]);

    const deleteHandler = (id) => {
        deleteOrder(id);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-3xl my-5 ml-4 font-bold">{orders?.ordersCount} Orders</h1>
            <table className="w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount Paid
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.orders?.map((order) => (
                        <tr key={order?._id} className="bg-white">
                            <td className="px-6 py-2">{order?._id}</td>
                            <td className="px-6 py-2">{order?.paymentInfo?.amountPaid.toFixed(2)} лв.</td>
                            <td className="px-6 py-2">{order?.orderStatus}</td>
                            <td className="px-6 py-2">
                                <div>
                                    <Link
                                        href={`/admin/orders/${order?._id}`}
                                        className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                    >
                                        <FontAwesomeIcon icon={faPencil} aria-hidden="true" />
                                    </Link>
                                    <a
                                        className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                        onClick={() => deleteHandler(order?._id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {orders?.ordersCount > orders?.resPerPage && (
                <div className="mb-6">
                    <CustomPagination resPerPage={orders?.resPerPage} productsCount={orders?.ordersCount} />
                </div>
            )}
        </div>
    );
};

export default Orders;