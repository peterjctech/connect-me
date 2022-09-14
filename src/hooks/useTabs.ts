import { useState } from "react";

export default function (tabList: string[]) {
    const [currentTab, setCurrentTab] = useState(tabList[0]);
    const changeTab = (tab: string) => setCurrentTab(tab);

    return { changeTab, currentTab, tabList };
}
