import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
});

function cartReducer(state, action) {
    if (action.type === "ADD") {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const updatedItems = [...state.items];
        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems }

    }

    if (action.type === "REMOVE") {
        const existingCartIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartIndex];

        const updatedItems = [...state.items];
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            };
            updatedItems[existingCartIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === "CLEAR") {
        return { ...state, items: [] }
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }

    function removeItem(id) {
        dispatchCartAction({ type: "REMOVE", id });
    }

    function addItem(item) {
        dispatchCartAction({ type: "ADD", item });
    }

    function clearCart() {
        dispatchCartAction({ type: "CLEAR" })
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext