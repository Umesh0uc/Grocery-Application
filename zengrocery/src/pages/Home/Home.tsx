import { useState } from 'react';
import './style.scss';

function Home(){
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([
        {title: "title1"},
        {title: "title2"},
        {title: "titl3"},
    ]);

    return (
        <div className="home">
            <div className={`spinner-border loader ${!data && loading ? 'd-block' : 'd-none'}`}></div> 
            <div className={`content ${!data && loading ? 'd-none' : ''}`}>
                {data.map((item) => {
                    return (
                        <div
                            className='item-card card col-3'
                        >
                            {item.title}
                        </div>
                    );
                })}    
            </div> 
        </div>
    );
}

export default Home;