import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, fetchCartItems, saveToCart, type CartState } from "../../redux/cartReducer";
import type { RootState } from "../../redux/store";
import "./style.scss";
import type { Product } from "../../utils/commonTypes";
import { useEffect } from "react";
import SpinLoader from "../../components/SpinLoader/SpinLoader";

function Cart(){

    const dispatch = useDispatch<any>();
    const { items, count, status, total } = useSelector<RootState, CartState>(state => state.cart);

    useEffect(() => {
        dispatch(fetchCartItems());
    }, []);

    const handleDeleteCartItem = (item: Product, index: number) => {
        dispatch(deleteFromCart({_id: item._id, index, dispatch}));
    };

    const handleQuantityChange = (item: Product, index: number, flag: boolean) => {
        if(!flag && count < 1){
            return;
        }
        if(flag && count > 9){
            return;
        }
        dispatch(saveToCart({_id: item._id, quantity: item.quantity + (flag ? 1 : -1), dispatch}));
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
            <table className="cart-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td style={{textAlign: 'left'}} ><img src={item.imageUrl} width={'50px'} style={{marginRight: '10px'}} alt={''}/><strong>{item.name}</strong></td>
                            <td>₹ {item.price}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-light" onClick={() => {handleQuantityChange(item, index, false)}}>-</button>
                                <span className="m-2">{item.quantity}</span>
                                <button type="button" className="btn btn-light" onClick={() => {handleQuantityChange(item, index, true)}}>+</button>
                                </div>
                            </td>
                            <td>₹ {item.quantity * item.price}</td>
                            <td>
                                <button className="delete-cart-item" onClick={() => {handleDeleteCartItem(item, index)}}><i className="bi bi-trash-fill"></i></button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
            <hr style={{borderColor: "#ffffff"}} />
            <table className="cart-summary">
            <tbody>
                <tr>
                <td><strong>Total Items:</strong></td>
                <td>{count}</td>
                </tr>
                <tr>
                <td><strong>Total Price:</strong></td>
                <td>₹ {total}</td>
                </tr>
                <tr>
                <td>
                    <button className="btn btn-success checkout-btn">Checkout</button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    );
}

export default Cart;