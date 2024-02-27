import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: [],
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { },
});

export function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState("");

    function hideCart() {
        setUserProgress("");
    }

    function showCart() {
        setUserProgress("cart");
    }

    function hideCheckout() {
        setUserProgress("");
    }

    function showCheckout() {
        setUserProgress("checkout");
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    };

    return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;