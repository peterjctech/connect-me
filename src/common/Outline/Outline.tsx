import { HiPencil } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { Tooltip } from "@common";
import { TagSummary } from "@types";
import { Tag } from "@components";

interface OutlineProps {
    image: string;
    heading: string;
    datetime: {
        main: string;
        hover: string;
    };
    canEdit?: boolean;
    isEdited: boolean;
    children: React.ReactNode;
    tags: TagSummary[];
}

const Outline = ({ image, heading, datetime, isEdited, canEdit, children, tags }: OutlineProps) => {
    return (
        <div className="outline container">
            <header>
                <img src={image} className="pfp--md" />
                <h6>{heading}</h6>
                <span>
                    <Tooltip hover={datetime.hover}>{datetime.main}</Tooltip>
                    {isEdited && (
                        <p className="outline__edited">
                            <BsDot />
                            edited
                        </p>
                    )}
                </span>
                {canEdit && <HiPencil />}
            </header>
            <hr />
            <section>{children}</section>
            <hr />
            {tags.length > 0 && (
                <>
                    <aside>
                        {tags.map((tag) => {
                            return <Tag tag={tag} />;
                        })}
                    </aside>
                    <hr />
                </>
            )}
        </div>
    );
};

export default Outline;
