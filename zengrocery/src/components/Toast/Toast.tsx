import type React from "react";
import { Toast } from "react-bootstrap";

type PropTypes = {
    show: boolean,
    message: string,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
};

function ToastNotification({show, message, setShow}:PropTypes){
    return (
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}

export default ToastNotification;