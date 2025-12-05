import type { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import type { RootState } from '../../redux/store';
import { setPage, type appState } from '../../redux/appReducer';

function Header(){

    const dispatch = useDispatch();
    const { page } = useSelector<RootState, appState>(state => state.app);

    const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        console.log(e.currentTarget.value);
        dispatch(setPage(e.currentTarget.value));
    };

    return (
        <nav className="header navbar navbar-expand-sm">
            <div className="container-fluid">
                <p className="h1">ZenGrocery</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <button className={`nav-link ${page === "home" && "active"}`} value={"home"} onClick={handleClick}>Home</button>
                        <button className={`nav-link ${page === "cart" && "active"}`} value={"cart"} onClick={handleClick}>Cart</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;