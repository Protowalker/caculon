import { Checkbox } from "@material-ui/core";
import { FunctionComponent } from "react";
import { InlineInput, makeSettings, useSettings } from "./Parts";

const ToggleSettings = {
    ...makeSettings(),
};
export const ToggleInput: FunctionComponent<{}> = (props) => {
    const settings = useSettings(ToggleSettings);
    return (
        <InlineInput settings={settings}>
            <Checkbox />
        </InlineInput>
    );
};
