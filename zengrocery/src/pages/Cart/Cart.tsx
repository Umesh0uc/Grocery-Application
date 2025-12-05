import { useState } from "react";

function Cart(){
    const [data, setData] = useState([]);
    return (
        <div className="cart">
            Here comes the cart items 
        </div>
    );
}

export default Cart;