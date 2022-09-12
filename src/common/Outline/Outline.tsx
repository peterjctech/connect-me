interface OutlineProps {
    image: string;
    text: string;
    picture?: string;
    heading: string;
    datetime: {
        absolute: string;
        relative: string;
    };
    children: React.ReactNode;
}

const Outline = ({ image, heading, datetime, text, picture, children }: OutlineProps) => {
    return (
        <div className="outline container">
            <header>
                <img src={image} className="pfp--md" />
                <h6>{heading}</h6>
                <p>{datetime.relative}</p>
            </header>
            <section>{children}</section>
        </div>
    );
};

export default Outline;
