'use client';

import { createContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);

    const clearErrors = () => {
        setError(null);
    };

    return (
        <OrderContext.Provider
            value={{
                error,
                updated,
                clearErrors,
                setUpdated,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export default OrderContext;