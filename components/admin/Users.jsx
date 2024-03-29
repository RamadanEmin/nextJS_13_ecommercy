'use client';

import { useContext, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomPagination from "../layouts/CustomPagination";
import AuthContext from "@/context/AuthContext";

const Users = ({ data }) => {
    const { error, clearErrors, deleteUser } = useContext(AuthContext);

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    const deleteHandler = (id) => {
        deleteUser(id);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-3xl my-5 ml-4 font-bold">{data?.usersCount} Users</h1>
            <table className="w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.users?.map((user) => (
                        <tr key={user?._id} className="bg-white">
                            <td className="px-6 py-2">{user?.name}</td>
                            <td className="px-6 py-2">{user?.email}</td>
                            <td className="px-6 py-2">{user?.role}</td>
                            <td className="px-6 py-2">
                                <div>
                                    <Link
                                        href={`/admin/users/${user?._id}`}
                                        className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                    >
                                        <FontAwesomeIcon icon={faPencil} aria-hidden="true" />
                                    </Link>
                                    <a
                                        className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                        onClick={() => { deleteHandler(user?._id) }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data?.usersCount > data?.resPerPage && (
                <div className="mb-6">
                    <CustomPagination resPerPage={data?.resPerPage} productsCount={data?.usersCount} />
                </div>
            )}
        </div>
    );
};

export default Users;