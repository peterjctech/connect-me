type VisibilityPreference = "Everyone" | "Nobody" | "Friends";

interface PrivacySettingsProps {
    friends?: VisibilityPreference;
    groups?: VisibilityPreference;
    posts?: VisibilityPreference;
    events?: VisibilityPreference;
}

export const getPrivacySettings = (settings: PrivacySettingsProps, isFriend: boolean) => {
    const check = (pref: VisibilityPreference) => {
        if (pref === "Everyone") return true;
        if (pref === "Nobody") return false;
        if (pref === "Friends" && isFriend) return true;
        return false;
    };

    const response: any = {};

    Object.entries(settings).forEach(([key, value], index) => {
        response[key] = check(value);
    });
    return response;
};

const obj: PrivacySettingsProps = {
    friends: "Everyone",
    groups: "Friends",
    events: "Nobody",
};

getPrivacySettings(obj, true);
