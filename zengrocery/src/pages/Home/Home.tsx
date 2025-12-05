import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import './style.scss';

type Product = {
    _id: string;
    name: string;
    price: string;
    category: string;
    imageUrl: string;
}

function Home(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const fetchProducts = async () => {
        const productsData = await getAllProducts();
        if(productsData){
            setData(productsData);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(data);

    return (
        <div className="home">
            <div className={`spinner-border loader ${!data.length && loading ? 'd-block' : 'd-none'}`}></div> 
            <div className={`content row row-gap-3  ${!data.length && loading ? 'd-none' : ''}`}>
                    {data.map((item: Product) => {
                        return (
                            <div
                                className='item-card card col-5 col-sm-4'
                            >
                                <img src={item.imageUrl} className='card-img-top' alt={item.name} />
                                <div className='card-body'>
                                    <h6 className='card-title'>{item.name}</h6>
                                    <p className='card-text'>{item.price}</p>
                                </div>
                            </div>
                        );
                    })}    
            </div> 
        </div>
    );
}

export default Home;