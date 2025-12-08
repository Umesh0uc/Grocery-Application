import { useSelector } from "react-redux";
import type { CartState } from "../../redux/cartReducer";
import type { RootState } from "../../redux/store";
import "./style.scss";

function Cart(){

    const { items, count } = useSelector<RootState, CartState>(state => state.cart);
    console.log("Cart items:", items);
    if(!count){
        return (
            <p style={{color: "white", textAlign: "center", marginTop: "30px"}}>No items in your cart!</p>
        );
    }
    return (
        <div className="cart">
            {Object.values(items).map(item => {
                return (
                    <div className="cart-item">
                        <strong>{item.name}</strong>
                    </div>
                );
            })}
        </div>
    );
}

export default Cart;