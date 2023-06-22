"use client";

import { useContext } from "react";
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
        </>
    );
};

export default Profile;
