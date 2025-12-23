type PropTypes = {
    show: boolean
}

function SpinLoader(props: PropTypes) {
    return (
        <div className={`spinner-border loader ${props.show ? 'd-block' : 'd-none'}`}></div>
    );
}

export default SpinLoader;