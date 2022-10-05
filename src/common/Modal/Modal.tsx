interface ModalProps {
    closeModal: () => void;
    children: React.ReactNode;
    className?: string;
}

const Modal = ({ closeModal, children, className }: ModalProps) => {
    const checkClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).className === "modal") closeModal();
    };

    return (
        <div onClick={checkClick} className="modal">
            <div className={`modal__content theme ${className ? className : ""}`}>{children}</div>
        </div>
    );
};

export default Modal;
