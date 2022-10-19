import { Color } from "types";
import { useRouter } from "next/router";
import Image from "next/image";

interface CardProps {
    image: string;
    title: string;
    link: string;
    children: React.ReactNode;
}

const Card = ({ children, title, link, image }: CardProps) => {
    const router = useRouter();
    return (
        <div className="card bordered">
            <div className="card__heading">
                <img src={image} className="img--sm" alt="" />
                <h6 className="card__title" onClick={() => router.push(link)}>
                    {title}
                </h6>
            </div>
            <div className="card__content">{children}</div>
        </div>
    );
};

export default Card;
