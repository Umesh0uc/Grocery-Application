import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import Home from '../Home/Home';
import Cart from '../Cart/Cart';
import './style.scss';
import type { appState } from '../../redux/appReducer';
import ToastNotification from '../../components/Toast/Toast';
import { destroyToast, toast, type toastState } from '../../redux/toastReducer';

function Layout(){

    const dispatch = useDispatch();
    const { page } = useSelector<RootState, appState>(state => state.app);
    const { message, show } = useSelector<RootState, toastState>(state => state.toast);

    return (
        <div className="layout container">
            <div style={{"display": page === "home" ? "block" : "none"}}>
                <Home/>
            </div>
            <div style={{"display": page === "cart" ? "block" : "none"}}>
                <Cart/>
            </div>
            <div className='toast-container'>
                <ToastNotification show={show} message={message} setShow={(message) => {message ? dispatch(toast(message)) : dispatch(destroyToast());}}  />
            </div>
        </div>
    );
}

export default Layout;