import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Tab {
    title: string;
    link: string;
}

const useTabs = (tabList: Tab[]) => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState<null | Tab>(null);

    useEffect(() => {
        const index = tabList.findIndex((tab) => tab.link === router.asPath);
        setCurrentTab(tabList[index]);
    }, [router.query, tabList, router.asPath]);

    const changeTab = (tab: Tab) => {
        router.push(tab.link);
        setCurrentTab(tab);
    };

    return { changeTab, currentTab, tabList };
};

export default useTabs;
