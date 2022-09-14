import { Button } from "@common";

interface HeaderProps {
    cover: string;
    image: string;
    mainText: string;
    buttonText: string;
    buttonFunction: () => void;
    dateText: string;
    subText: string;
}

const Header = ({ cover, image, mainText, buttonText, buttonFunction, dateText, subText }: HeaderProps) => {
    return (
        <div className="banner">
            <img src={cover} className="banner__cover" />
            <section>
                <div className="wrapper">
                    <img src={image} className="banner__image pfp--lg" />
                    <h3 className="banner__text">{mainText}</h3>
                    <h6 className="banner__subtext">{subText}</h6>
                    <p className="banner__date">{dateText}</p>
                    <Button click={buttonFunction} squared>
                        {buttonText}
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Header;
