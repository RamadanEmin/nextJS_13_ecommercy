const UpdateUser = () => {

    return (
        <>
            <div
                style={{ maxWidth: "480px" }}
                className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
            >
                <form>
                    <h2 className="mb-5 text-2xl font-semibold">Update User</h2>

                    <div className="mb-4">
                        <label className="block mb-1"> Full Name </label>
                        <input
                            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            type="text"
                            placeholder="Type your name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1"> Email </label>
                        <input
                            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            type="text"
                            placeholder="Type your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1"> Role </label>
                        <div className="relative">
                            <select
                                className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                                name="category"
                                required
                            >
                            </select>
                            <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
                                <svg
                                    width="22"
                                    height="22"
                                    className="fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M7 10l5 5 5-5H7z"></path>
                                </svg>
                            </i>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateUser;