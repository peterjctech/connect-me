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
        <div className="header">
            <img src={cover} className="header__cover" />
            <section>
                <div className="wrapper">
                    <img src={image} className="header__image pfp--lg" />
                    <h3 className="header__text">{mainText}</h3>
                    <h6 className="header__subtext">{subText}</h6>
                    <p className="header__date">{dateText}</p>
                    <Button click={buttonFunction} squared>
                        {buttonText}
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Header;
