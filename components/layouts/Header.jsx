"use client";

import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import Search from "./Search";
import CartContext from "@/context/CartContext";
import AuthContext from "@/context/AuthContext";

const Header = () => {
    const { data } = useSession();
    const { user, setUser } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    useEffect(() => {
        if (data) {
            setUser(data?.user);
        }
    }, [data]);

    const cartItems = cart?.cartItems;

    return (
        <header className="bg-white py-2 border-b">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="flex flex-wrap items-center">
                    <div className="flex-shrink-0 mr-5">
                        <a href="/">
                            <Image
                                src="/images/logo.png"
                                height="100"
                                width="100"
                                alt="logo-image"
                            />
                        </a>
                    </div>
                    <Search />

                    <div className="flex items-center space-x-2 ml-auto">
                        {!user ? (
                            <Link
                                href="/login"
                                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
                            >
                                <i className="text-gray-400 w-5 fa fa-user"></i>
                                <span className="hidden lg:inline ml-1">Sign in</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/cart"
                                    className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
                                >
                                    <FontAwesomeIcon
                                        icon={faCartShopping}
                                        className="text-gray-400 w-5 fa fa-shopping-cart"
                                    />
                                    <span className="hidden lg:inline ml-1">
                                        Cart (<b>{cartItems?.length || 0}</b>)
                                    </span>
                                </Link>

                                <Link href="/me">
                                    <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                                        <Image
                                            className="w-10 h-10 rounded-full"
                                            src={user.image ? user.image.url : "/images/profil.png"}
                                            height="100"
                                            width="100"
                                            alt="profil-image"
                                        />
                                        <div className="space-y-1 font-medium">
                                            <p>
                                                {user.name}
                                                <time className="block text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </time>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="lg:hidden ml-2">
                        <button
                            type="button"
                            className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
                        >
                            <span className="sr-only">Open menu</span>
                            <i className="fa fa-bars fa-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
