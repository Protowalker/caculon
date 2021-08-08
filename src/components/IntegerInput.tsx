import { TextField } from "@material-ui/core";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { BlockInput, makeSettings } from "./Parts";
import { intSetting } from "./Settings";
import { useSettings } from "./Parts";
import { numbersOnly } from "./Utils/Util";
import { VariableContext } from "../App";

const IntegerSettings = {
    ...makeSettings(),
    min: {
        ...intSetting(
            "Minimum",
            Number.MIN_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            0
        ),
        toggleable: true,
        defaultToggleState: false,
    },
    max: {
        ...intSetting(
            "Maximum",
            Number.MIN_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            10
        ),
        toggleable: true,
        defaultToggleState: false,
    },
};

export const IntegerInput: FC<{}> = (props) => {
    const settings = useSettings(IntegerSettings);
    const [variables, dispatch] = useContext(VariableContext);

    const [value, setValue] = useState(parseInt(settings.min.value.toString()));

    useEffect(() => {
        dispatch({
            kind: "Add",
            new_entry: {
                name: settings.name.value.toString(),
                value: value,
            },
        });

        return () => {
            dispatch({
                kind: "Remove",
                entry_name: settings.name.value.toString(),
            });
        };
    }, [settings, dispatch, value]);



    return (
        <BlockInput settings={settings}>
            <TextField
                placeholder={`${settings.min.value} to ${settings.max.value}`}
                label="value"
                variant="filled"
                inputProps={{ min: settings.min, max: settings.max }}
                onChange={(event) => {
                    const val = numbersOnly(event.currentTarget.value);
                    event.currentTarget.value = val;
                    setValue(parseInt(val) ?? 0);
                }}
            />
        </BlockInput>
    );
};
