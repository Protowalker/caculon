import { Button, Box, CssBaseline } from "@material-ui/core";
import * as VarStore from "./VarStore";
import { IntegerInput } from "./components/IntegerInput";
import { ToggleInput } from "./components/ToggleInput";

import React from "react";
import { useState, useReducer } from "react";
import "./App.css";

export const EditModeContext = React.createContext(false);
export const VariableContext = React.createContext<
    [VarStore.VariableStore, (action: VarStore.Action) => void]
>([{}, (_) => {}]);

//const variableReducer = (state, action: {type: VarStoreAction, value: string | object}) => {
//    if (action.type == VarStoreAction.Add) {
//        return {
//            variables: {
//                ...state.variables,
//            }
//        }
//    }
//};

function App() {
    let [editMode, setEditMode] = useState(false);
    let [variables, dispatchToVariables] = useReducer(
        VarStore.variableReducer,
        {}
    );

    return (
        <>
            <CssBaseline />
            <EditModeContext.Provider value={editMode}>
                <VariableContext.Provider
                    value={[variables, dispatchToVariables]}
                >
                    <Box display="flex" flexDirection="column" maxWidth={1 / 2}>
                        <IntegerInput></IntegerInput>
                        <ToggleInput></ToggleInput>
                    </Box>
                </VariableContext.Provider>
            </EditModeContext.Provider>
            <Button
                onClick={() => setEditMode(!editMode)}
                variant="contained"
                color="primary"
            >
                test
            </Button>
        </>
    );
}

export default App;
