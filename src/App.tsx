import { Button, Box, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { IntegerInput } from "./components/Basic";
import * as VarStore from "./VarStore";

import React from "react";
import { useState, useReducer } from "react";
import "./App.css";
import theme from "./theme";

export const EditModeContext = React.createContext(false);
export const VariableContext = React.createContext<[VarStore.VariableStore, (action: VarStore.Action) => void]>([{}, (_) => {}]);


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
    let [variables, dispatchToVariables] = useReducer(VarStore.variableReducer, {});

    return (
        <>
            <CssBaseline />
            <EditModeContext.Provider value={editMode}>
                <VariableContext.Provider value={[variables, dispatchToVariables]}>
                    <IntegerInput name="SomeVariable" min={0} max={10} value={0}></IntegerInput>
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
