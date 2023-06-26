"use client";

import { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserAddresses from "../user/UserAddresses";
import AuthContext from "@/context/AuthContext";

const Profile = ({ addresses }) => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <figure className="flex items-start sm:items-center">
                <div className="relative">
                    <img
                        className="w-16 h-16 rounded-full mr-4"
                        src={user?.image ? user.image.url : "/images/profil.png"}
                        alt={user?.name}
                    />
                </div>
                <figcaption>
                    <h5 className="font-semibold text-lg">{user?.name}</h5>
                    <p>
                        <b>Email:</b> {user?.email} | <b>Joined On:</b>
                        {user?.createdAt?.substring(0, 10)}
                    </p>
                </figcaption>
            </figure>

            <hr className="my-4" />

            <UserAddresses addresses={addresses} />

            <Link href="/address/new">
                <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
                    <FontAwesomeIcon icon={faPlus} size="1x" className="mr-1" /> Add new
                    address
                </button>
            </Link>

            <hr className="my-4" />
        </>
    );
};

export default Profile;
