import { Settings } from "./Parts";
import { SettingValue } from "./Settings";

type BaseSettingAction = {
    kind: string;
};

type ToggleSettingAction = BaseSettingAction & {
    kind: "Toggle";
};

export type SettingAction = ToggleSettingAction;
export type SettingsCollectionAction = SettingAction & { settingName: string };

export const settingsReducer = (
    state: Settings,
    action: SettingAction & { settingName: string }
) => {
    const setting = state[action.settingName];
    if (setting === undefined) {
        return state;
    }
    return { ...state, [action.settingName]: settingReducer(setting, action) };
};

const settingReducer = (state: SettingValue, action: SettingAction) => {
    switch (action.kind) {
        case "Toggle": {
            return { ...state, enabled: !state.enabled };
        }

        default: {
            return state;
        }
    }
};
