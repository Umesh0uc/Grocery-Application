import { useEffect, useState, type ChangeEvent } from 'react';
import { getAllProducts } from '../../services/productService';
import type { Product } from '../../utils/commonTypes';
import ProductCard from '../../components/ProductCard/ProductCards';
import './style.scss';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import type { CartState } from '../../redux/cartReducer';
import SpinLoader from '../../components/SpinLoader/SpinLoader';

function Home(){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("All");
    const { items } = useSelector<RootState, CartState>(state => state.cart);
    const filterOptions = ["All", "Fruits", "Vegetables", "Dairy", "Snacks"];

    const fetchProducts = async () => {
        const productsData = await getAllProducts();
        if(productsData){
            setData(productsData);
            setLoading(false);
        }
    }

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <div className="home">
            <SpinLoader show={!data.length && loading} />
            <div className={`content row row-gap-3  ${!data.length && loading ? 'd-none' : ''}`}>
                    <div className='filter-container'>
                        <i className="bi bi-funnel mx-2"></i>
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                        >
                            {
                                filterOptions.map(item => <option key={item} value={item}>{item}</option>)
                            }
                        </select>
                    </div>
                    {data.filter((item: Product) => {return filter === "All" || item.category === filter}).map((item: Product) => <ProductCard key={item._id} item={item} items={items} />)}    
            </div> 
        </div>
    );
}

export default Home;