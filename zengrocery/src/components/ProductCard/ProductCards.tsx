import type { Product } from "../../utils/commonTypes";
import './style.scss';
import { useDispatch } from "react-redux";
import { saveToCart } from "../../redux/cartReducer";

function ProductCard({item, items}:{item:Product, items:Product[]}){

    const dispatch = useDispatch<any>();
    
    const handleClick = async (): Promise<void> => {
        if(!items.find(product => product._id === item._id)){
            dispatch(saveToCart({_id: item._id,quantity: 1,dispatch}));
        }
    };

    return (
        <div
            className='item-card card col-12 col-sm-4'
        >
            <img src={item.imageUrl} className='card-img-top' alt={item.name} />
            <div className='card-body'>
                <div className='row align-items-center'>
                    <div className='col-9'>
                        <h6 className='card-title'><strong>{item.name}</strong></h6>
                        <p className='card-text'>₹ {item.price}</p>
                    </div>
                    <button className='icon-button col-3 p-0 m-auto' onClick={handleClick}>
                        {items.length && items.find(product => product._id === item._id) ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-plus-circle"></i>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;