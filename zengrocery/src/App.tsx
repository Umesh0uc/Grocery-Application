import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import Layout from './pages/Layout/Layout';
import Header from './components/Header/Header';

function App() {

    return (
        <div className='app'>
            <Header/>
            <Layout/>
        </div>
    )
}

export default App
