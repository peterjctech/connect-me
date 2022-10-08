import { useState } from "react";
import { useRouter } from "next/router";

interface Tab {
    title: string;
    link: string;
}

export default function (tabList: Tab[]) {
    const router = useRouter();
    const index = tabList.findIndex((tab) => tab.link === router.asPath);

    const [currentTab, setCurrentTab] = useState(tabList[index]);

    const changeTab = (tab: Tab) => {
        router.push(tab.link);
        setCurrentTab(tab);
    };

    return { changeTab, currentTab, tabList };
}
