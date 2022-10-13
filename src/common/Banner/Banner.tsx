import Button from "common/Button/Button";

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
            <img src={cover} className="banner__cover" />
            <section>
                <div className="wrapper">
                    <img src={image} className="banner__image img--lg" />
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
