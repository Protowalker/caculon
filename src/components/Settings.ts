namespace NSBaseSetting {
    type _BaseSetting<T> = {
        displayName: string;
        defaultValue: T;
    };

    type ToggleableBaseSetting<T> = _BaseSetting<T> & {
        toggleable: true;
        defaultToggleState: boolean;
    };
    type NonToggleableBaseSetting<T> = _BaseSetting<T> & {
        toggleable: false;
    };

    export type BaseSetting<T> =
        | ToggleableBaseSetting<T>
        | NonToggleableBaseSetting<T>;
}
type BaseSetting<T> = NSBaseSetting.BaseSetting<T>;

export type StringSetting = BaseSetting<string> & {
    type: "string";
    maxLength: number;
};

export function stringSetting(
    displayName: string,
    maxLength: number,
    defaultValue: string
): StringSetting {
    return {
        type: "string",
        displayName,
        maxLength,
        defaultValue,
        toggleable: false,
    };
}

export type IntSetting = BaseSetting<number> & {
    type: "int";
    min: number;
    max: number;
};
export function intSetting(
    displayName: string,
    min: number,
    max: number,
    defaultValue: number
): IntSetting {
    return {
        type: "int",
        displayName,
        min,
        max,
        defaultValue,
        toggleable: false,
    };
}

export type Setting = StringSetting | IntSetting;

export type SettingValue = {
    setting: Setting;
    enabled: boolean;
    value: SettingValue["setting"]["defaultValue"];
};

export function createSettingValue(setting: Setting): SettingValue {
    const value = {
        setting,
        enabled: true,
        value: setting.defaultValue,
    };
    if (setting.toggleable) {
        value.enabled = setting.defaultToggleState;
    }

    return value;
}
