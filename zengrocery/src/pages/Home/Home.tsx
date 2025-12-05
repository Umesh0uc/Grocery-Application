import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import type { Product } from '../../utils/commonTypes';
import ProductCard from '../../components/ProductCard/ProductCards';
import './style.scss';

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
                    {data.map((item: Product) => <ProductCard item={item} />)}    
            </div> 
        </div>
    );
}

export default Home;