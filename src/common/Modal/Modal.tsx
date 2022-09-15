interface ModalProps {
    closeModal: () => void;
    children: React.ReactNode;
}

const Modal = ({ closeModal, children }: ModalProps) => {
    const checkClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).className === "modal") closeModal();
    };

    return (
        <div onClick={checkClick} className="modal">
            <div className="modal__content theme">{children}</div>
        </div>
    );
};

export default Modal;
