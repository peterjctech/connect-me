import Button from "common/Button/Button";
import Image from "next/image";

interface BannerProps {
    cover: string;
    image: string;
    mainText: string;
    subText: string;
    otherData: {
        text: string;
        icon: React.ReactElement;
    }[];
    action?: {
        action: Function;
        button: "success" | "warning" | "info" | "help" | "error";
        text: string;
    };
}

const Banner = ({ cover, image, mainText, subText, otherData, action }: BannerProps) => {
    return (
        <div className="banner">
            <div className="banner__cover">
                <Image src={cover} layout="fill" className="banner__cover" />
            </div>
            <section>
                <div className="wrapper">
                    <div className="banner__image img--lg">
                        <Image src={image} layout="fill" />
                    </div>
                    <h3>{mainText}</h3>
                    <p>{subText}</p>
                    <div className="banner__info">
                        {otherData.map((data) => {
                            return (
                                <span key={data.text}>
                                    {data.icon} {data.text}
                                </span>
                            );
                        })}
                    </div>
                    {action && (
                        <Button click={() => action.action()} type={action.button} squared>
                            {action.text}
                        </Button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Banner;
