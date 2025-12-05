import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import Home from '../Home/Home';
import Cart from '../Cart/Cart';
import './style.scss';
import type { appState } from '../../redux/appReducer';

function Layout(){

    const { page } = useSelector<RootState, appState>(state => state.app);

    return (
        <div className="layout container">
            <div style={{"display": page === "home" ? "block" : "none"}}>
                <Home/>
            </div>
            <div style={{"display": page === "cart" ? "block" : "none"}}>
                <Cart/>
            </div>
        </div>
    );
}

export default Layout;