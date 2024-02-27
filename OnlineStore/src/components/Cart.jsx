import { useContext } from "react"
import CartContext from "../store/CartContext"
import { currencyFormatter } from "../util"
import Button from "./UI/button"
import UserProgressContext from "../store/UserProgressContext"
import Modal from "./UI/Modal"
import CartItem from "./CartItem"

export default function Cart() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const cartTotal = cartCtx.items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => <CartItem key={item.id} {...item}
                    onIncrease={() => {
                        cartCtx.addItem(item)
                    }}

                    onDecrease={() => {
                        cartCtx.removeItem(item.id)
                    }} />)}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}