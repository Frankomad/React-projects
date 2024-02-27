import Modal from "./UI/Modal"
import Input from "./UI/Input"
import Button from "./UI/button";
import Error from "./Error.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util.js";
import useHttp from "../hooks/useHttp.js";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp("http://localhost:3000/orders", requestConfig)

    const cartTotal = cartCtx.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    function handleCloseCheckout() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const customerData = Object.fromEntries(data.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        )
    }

    let actions =
        (<>
            <Button type="button" textOnly onClick={handleCloseCheckout}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>);

    if (isSending) {
        actions = <p>Sending order data...</p>
    }

    if (data && !error) {
        return <Modal open={userProgressCtx.progress == "checkout"} onClose={handleCloseCheckout}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details via email withing next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Close</Button>
            </p>
        </Modal>
    }

    return (
        <Modal open={userProgressCtx.progress === "checkout"} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout:</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="full-name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to submit order" message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}