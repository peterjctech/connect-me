import { Loading } from "components";

type Tab = { title: string; link: string };

interface TabsProps {
    tabs: Tab[];
    changeTab: (tab: Tab) => void;
    currentTab: Tab | null;
}

const Tabs = ({ tabs, changeTab, currentTab }: TabsProps) => {
    if (!currentTab)
        return (
            <div>
                <Loading />
            </div>
        );

    return (
        <div className="tabs theme bordered">
            {tabs.map((tab) => {
                return (
                    <p
                        onClick={() => changeTab(tab)}
                        className={currentTab.title === tab.title ? "active" : ""}
                        key={tab.title}
                    >
                        {tab.title}
                    </p>
                );
            })}
        </div>
    );
};

export default Tabs;
