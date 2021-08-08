export interface IntVariable {
    name: string;
    value: number;
}

export type Variable = IntVariable;

interface Add {
    kind: "Add";
    new_entry: Variable;
}

interface Remove {
    kind: "Remove";
    entry_name: string;
}
interface Rename {
    kind: "Rename";
    old_name: string;
    new_name: string;
}

export type Action = Add | Remove | Rename;

//export interface VariableStore {
//    variables: { [name: string]: Variable };
//}

export type VariableStore = { [name: string]: Variable };

export const variableReducer = (state: VariableStore, action: Action) => {
    switch (action.kind) {
        case "Add": {
            // Just fail if name is the same.
            // TODO: Something better
            if (action.new_entry.name in Object.keys(state)) {
                return state;
            }
            return { ...state, [action.new_entry.name]: action.new_entry };
        }
        case "Remove": {
            if (!Object.keys(state).includes(action.entry_name)) return state;
            const { [action.entry_name]: removed, ...rest } = state;
            return rest;
        }
        case "Rename": {
            if (!Object.keys(state).includes(action.old_name)) return state;
            const { [action.old_name]: toBeRenamed, ...rest } = state;
            return {
                [action.new_name]: toBeRenamed,
                ...rest,
            };
        }
        default: {
            return state;
        }
    }
};
