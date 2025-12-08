import { useState } from "react";
import type { Product } from "../../utils/commonTypes";
import './style.scss';
import { useDispatch } from "react-redux";
import { toast } from "../../redux/toastReducer";
import { addToCart, removeCartItem } from "../../redux/cartReducer";

function ProductCard({item}:{item:Product}){

    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false);

    const addProductToCart = (product: Product) => {
        dispatch(addToCart(product));
    };
    const removeFromCart = (id: string) => {
        dispatch(removeCartItem(id));
    };

    const handleClick = (): void => {
        if(!clicked){
            dispatch(toast(`${item.name} has been added to cart.`));
            addProductToCart(item);
        }
        else{
            removeFromCart(item._id);
        }
        setClicked(prev => !prev);
    };

    return (
        <div
            className='item-card card col-12 col-sm-4'
        >
            <img src={item.imageUrl} className='card-img-top' alt={item.name} />
            <div className='card-body'>
                <div className='row align-items-center'>
                    <div className='col-9'>
                        <h6 className='card-title'>{item.name}</h6>
                        <p className='card-text'>{item.price}</p>
                    </div>
                    <button className='icon-button col-3 p-0 m-auto' onClick={handleClick}>
                        {clicked ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-plus-circle"></i>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;