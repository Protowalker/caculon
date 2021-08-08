import { FC, useCallback, useContext, useMemo, useState } from "react";
import {
    makeStyles,
    Box,
    Paper,
    IconButton,
    TextField,
    Button,
    Checkbox,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import {
    createSettingValue,
    Setting,
    SettingValue,
    StringSetting,
    stringSetting,
} from "./Settings";
import { EditModeContext } from "../App";
import {SettingAction} from "./SettingReducer";

export interface SettingSchema {
    name: StringSetting;
    displayName: StringSetting;
    [name: string]: Setting;
}
export function makeSettings(): SettingSchema {
    return {
        name: stringSetting("Name", 30, "someName"),
        displayName: stringSetting("Display Name", 20, "Some Name"),
    };
}

export type Settings = { [name: string]: SettingValue };

export const useSettings = (settingSchema: SettingSchema) => {
    const startingValue = useMemo(() => {
        const startingSettings: { [string: string]: SettingValue } = {};
        for (const setting in settingSchema) {
            startingSettings[setting] = createSettingValue(
                settingSchema[setting]
            );
        }
        return startingSettings;
    }, [settingSchema]);

    return startingValue;
};

export const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 0.2,
        flexBasis: "content",
        flexShrink: 1,
    },
    children: {
        display: "flex",
        alignItems: "center",
        padding: "2%",
        paddingRight: 0,
    },
    input: {
        maxHeight: "10%",
    },
    iconButton: {
        paddingTop: 0,
        paddingBottom: 0,
        justifyContent: "center",
        color: theme.palette.text.primary,
    },
}));
export const BlockInput: FC<{ settings: Settings }> = (props) => {
    return (
        <BaselineInput settings={props.settings}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="space-evenly"
            >
                <div>{props.settings.displayName.value}</div>
                <div>{props.children}</div>
            </Box>
        </BaselineInput>
    );
};

export const InlineInput: FC<{ settings: Settings }> = (props) => {
    return (
        <BaselineInput settings={props.settings}>
            <Box display="flex" flexDirection="row" alignItems="center">
                <div>{props.settings.displayName.value}</div>
                <div>{props.children}</div>
            </Box>
        </BaselineInput>
    );
};

export const BaselineInput: FC<{ settings: Settings }> = (props) => {
    const classes = useStyles();
    const editMode = useContext(EditModeContext);

    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <Box
            display="inline-flex"
            flexDirection="row"
            minWidth={1 / 3}
            maxWidth={1}
            justifyContent="stretch"
            alignItems="stretch"
            m="0.5em"
        >
            <Paper
                elevation={5}
                color="secondary.main"
                className={classes.container}
            >
                <Box className={classes.children}>{props.children}</Box>
                {editMode && (
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => setSettingsOpen(true)}
                    >
                        <SettingsIcon />
                    </IconButton>
                )}
            </Paper>
            {editMode && (
                <Box flexDirection="column" alignSelf="center">
                    <IconButton className={classes.iconButton}>
                        <FileCopyIcon />
                    </IconButton>
                    <IconButton className={classes.iconButton}>
                        <DeleteIcon />
                    </IconButton>
                    {settingsOpen ? 
                    <SettingsDialog
                        settings={props.settings}
                        open={settingsOpen}
                        setOpen={setSettingsOpen}
                        dispatch={() => {}}
                    /> : null}
                </Box>
            )}
        </Box>
    );
};

const SettingsDialog: FC<{
    settings: Settings;
    dispatch(action: SettingAction & {settingName: string}): void;
    open: boolean;
    setOpen: (open: boolean) => void;
}> = ({dispatch, open, setOpen, settings}) => {

    const buildDispatch = useCallback((name: string) => {
        return function(action: SettingAction) {
            dispatch({...action, settingName: name});
        }
    }, [dispatch]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                {settings.displayName.value} Settings
            </DialogTitle>
            <DialogContent>
                {Object.keys(settings).map((setting) => (
                    <SingleSetting setting={settings[setting]} dispatch={buildDispatch(setting)} />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}> Cancel </Button>
                <Button onClick={() => setOpen(false)}> Save </Button>
            </DialogActions>
        </Dialog>
    );
};

const SingleSetting: FC<{ setting: SettingValue, dispatch: (action: SettingAction) => void }> = ({ setting, dispatch }) => {

    

    return (
        <DialogContent>
            <TextField
                label={setting.setting.displayName}
                placeholder={setting.setting.defaultValue.toString()}
                defaultValue={setting.value.toString()}
                disabled={!setting.enabled}
            ></TextField>
            {setting.setting.toggleable ? (
                <Checkbox
                    defaultChecked={setting.enabled}
                    onClick={() => dispatch({kind: "Toggle"})}
                />
            ) : null}
        </DialogContent>
    );
};
