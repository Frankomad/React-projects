import { useContext } from "react"

import { currencyFormatter } from "../util"
import Button from "./UI/button"
import cartContext from "../store/CartContext.jsx"

export default function MealItem({ meal }) {
    const cartCtx = useContext(cartContext)

    function handleAddToCart() {
        cartCtx.addItem(meal)
    }

    return (
        <li key={meal.name} className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                    <p className="meal-item-actions">
                        <Button onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                    </p>
                </div>
            </article>
        </li>
    )
}