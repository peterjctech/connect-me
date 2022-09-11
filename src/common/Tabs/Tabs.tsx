interface TabsProps {
    tabs: string[];
    changeTab: (tab: string) => void;
    currentTab: string;
}

const Tabs = ({ tabs, changeTab, currentTab }: TabsProps) => {
    return (
        <div className="tabs theme">
            {tabs.map((tab) => {
                return (
                    <p onClick={() => changeTab(tab)} className={currentTab === tab ? "active" : ""} key={tab}>
                        {tab}
                    </p>
                );
            })}
        </div>
    );
};

export default Tabs;
