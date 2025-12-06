import { useState } from "react";
import type { Product } from "../../utils/commonTypes";
import './style.scss';
import { useDispatch } from "react-redux";
import { toast } from "../../redux/toastReducer";

function ProductCard({item}:{item:Product}){

    const dispatch = useDispatch();
    const [clicked, setClicked] = useState(false);

    const addToCart = (product: Product) => {

    };

    const handleClick = (): void => {
        !clicked && dispatch(toast(item.name + " has been added to cart."));
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