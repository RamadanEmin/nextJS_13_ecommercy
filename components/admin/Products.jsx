import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomPagination from "../layouts/CustomPagination";

const Products = ({ data }) => {

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1 className="text-3xl my-5 ml-4 font-bold">{data?.productCount} Products</h1>
            <table className="w-full text-sm text-left">
                <thead className="text-l text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products?.map((product) => (
                        <tr key={product?._id} className="bg-white">
                            <td className="px-6 py-2">{product?.name}</td>
                            <td className="px-6 py-2">{product?.stock}</td>
                            <td className="px-6 py-2">{product?.price.toFixed(2)} лв.</td>
                            <td className="px-6 py-2">
                                <div>
                                    <Link
                                        href={`/admin/products/${product?._id}/upload_images`}
                                        className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                    >
                                        <FontAwesomeIcon icon={faImage} aria-hidden="true" />
                                    </Link>

                                    <Link
                                        href={`/admin/products/${product?._id}`}
                                        className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                                    >
                                        <FontAwesomeIcon icon={faPencil} aria-hidden="true" />
                                    </Link>
                                    <a
                                        className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data?.filteredProductsCount > data?.resPerPage && (
                <div className="mb-6">
                    <CustomPagination resPerPage={data?.resPerPage} productsCount={data?.filteredProductsCount} />
                </div>
            )}
        </div>
    );
};

export default Products;