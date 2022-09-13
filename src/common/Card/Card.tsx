interface CardProps {
    picture: string;
    title: string;
    titleLink: string;
    children: React.ReactNode;
}

const Card = ({ picture, children, title }: CardProps) => {
    return (
        <div className="card">
            <img src={picture} />
            <div className="card__content">
                <h6 className="card__title">{title}</h6>
                {children}
            </div>
        </div>
    );
};

export default Card;
