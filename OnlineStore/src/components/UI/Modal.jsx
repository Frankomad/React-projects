import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"

export default function Modal({ children, open, onClose, className = "" }) {
    const dialog = useRef();

    useEffect(() => {
        if (open && !dialog.current.open) {
            dialog.current.showModal();
        } else if (!open && dialog.current.open) {
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        <dialog ref={dialog} open={open}
            onClose={onClose}
            className={`modal ${className}`}>
            {children}
        </dialog>
        , document.getElementById('modal'));
}