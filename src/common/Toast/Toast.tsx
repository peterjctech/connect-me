interface ToastProps {
    message: string;
    type: "success" | "error" | "warning" | "info" | "help";
}

const Toast = (props: ToastProps) => {
    return (
        <div className={`toast ${props.type}`}>
            <h4 className="toast__message">{props.message}</h4>
        </div>
    );
};

export default Toast;
