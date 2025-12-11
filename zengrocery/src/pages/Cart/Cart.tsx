import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, type CartState } from "../../redux/cartReducer";
import type { RootState } from "../../redux/store";
import "./style.scss";
import type { Product } from "../../utils/commonTypes";
import { useEffect } from "react";
import SpinLoader from "../../components/SpinLoader/SpinLoader";

function Cart(){

    const dispatch = useDispatch<any>();
    const { items, count, status } = useSelector<RootState, CartState>(state => state.cart);

    useEffect(() => {
        dispatch(fetchCartItems());
    }, []);

    const handleDeleteCartItem = (item: Product) => {
        // dispatch(removeCartItem(item._id));
    };

    if(!count){
        return (
            <p style={{color: "white", textAlign: "center", marginTop: "30px"}}>No items in your cart!</p>
        );
    }
    if(['idle', 'loading'].includes(status)){
        return <SpinLoader show={true}/>;
    }
    return (
        <div className="cart">
            {Object.values(items).map(item => {
                return (
                    <div className="cart-item">
                        <div className="cart-item-content">
                            <strong>{item.name}</strong>
                            <p className="item-price">{item.price}</p>
                        </div>
                        <div className="cart-item-delete">
                                <button className="delete-cart-item" onClick={() => {handleDeleteCartItem(item)}}><i className="bi bi-trash-fill"></i></button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Cart;