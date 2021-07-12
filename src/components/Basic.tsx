import {
    FunctionComponent,
    ReactElement,
    useContext,
    useDebugValue,
    useEffect,
    useState,
} from "react";
import {
    Paper,
    Card,
    Box,
    Grid,
    TextField,
    makeStyles,
    Button,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import { VariableContext, EditModeContext } from "../App";
import * as VarStore from "../VarStore";

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.primary.main,
    },
    layout: {},
    root: {
        flexShrink: 1,
    },
    input: {
        maxHeight: "10%",
    },
}));

function useVariable(variable: VarStore.Variable) {
    const [_, dispatchToVariables] = useContext(VariableContext);

    useDebugValue(variable);

    useEffect(() => {
        dispatchToVariables({
            kind: "Add",
            new_entry: variable,
        });

        return () => {
            dispatchToVariables({
                kind: "Remove",
                entry_name: variable.name,
            });
        };
    }, []);
}

export const IntegerInput: FunctionComponent<VarStore.IntVariable> = (
    props
) => {
    const editMode = useContext(EditModeContext);
    const classes = useStyles();

    useVariable(props);
    const [min, setMin] = useState(0);

    return (
        <BaselineInput>
            <TextField
                placeholder="test"
                label="value"
                type="number"
                variant="filled"
                inputProps={{ min: min, max: props.max }}
            />
            {editMode ? (
                <>
                    <Grid container item direction="column" xs={3}>
                        <TextField
                            placeholder="min"
                            label="min"
                            type="number"
                            size="small"
                            variant="filled"
                            onBlur={(ref) => setMin(parseInt(ref.target.value))}
                        />
                        <TextField
                            placeholder="max"
                            label="max"
                            value={props.max}
                            type="number"
                            size="small"
                            variant="filled"
                        />
                    </Grid>
                    <Button>
                        <SettingsIcon />
                    </Button>
                </>
            ) : (
                <></>
            )}
        </BaselineInput>
    );
};

const BaselineInput: FunctionComponent<{}> = (props) => {
    const classes = useStyles();

    return (
        <Box maxWidth="30em" display="flex" m={1}>
            <Paper className={classes.paper} variant="outlined">
                <Box p={1}>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="flex-start"
                        className={classes.layout}
                        spacing={1}
                    >
                        {props.children}
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};
