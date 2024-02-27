import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';


export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((acc, item) => { return acc + item.quantity; }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        < header id="main-header" >
            <div id="title">
                <img src={logoImg} alt="foody" />
                <h1>Foody</h1>
            </div>
            <nav>
                <Button onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header >
    )
}